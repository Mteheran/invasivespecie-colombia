import { useEffect, useState } from 'react';
import { fetchEverySpecie, enrichSpecie, type EnrichedSpecie } from '../services/invasiveSpecie';
import { readSpeciesCache, writeSpeciesCache } from '../utils/speciesCache';

// Caché en memoria (más rápido dentro de la misma sesión).
let memCache: EnrichedSpecie[] | null = null;
let inflight: Promise<EnrichedSpecie[]> | null = null;

/** Descarga la lista desde la API, la persiste y actualiza el caché en memoria. */
function fetchAndStore(): Promise<EnrichedSpecie[]> {
  if (!inflight) {
    inflight = fetchEverySpecie()
      .then((list) => {
        writeSpeciesCache(list);
        memCache = list.map(enrichSpecie);
        return memCache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/** Estado inicial síncrono desde el caché (memoria → localStorage). */
function initialData(): EnrichedSpecie[] {
  if (memCache) return memCache;
  const cached = readSpeciesCache();
  if (cached) {
    memCache = cached.data.map(enrichSpecie);
    return memCache;
  }
  return [];
}

interface UseSpeciesResult {
  all: EnrichedSpecie[];
  loading: boolean;
  error: boolean;
}

/**
 * Carga todas las especies con estrategia stale-while-revalidate:
 * muestra el caché al instante y refresca en segundo plano si venció (TTL 7 días).
 */
export function useSpecies(): UseSpeciesResult {
  const [all, setAll] = useState<EnrichedSpecie[]>(initialData);
  const [loading, setLoading] = useState(all.length === 0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const cached = readSpeciesCache();
    const isFresh = cached?.fresh ?? false;

    // Caché vigente y datos ya presentes: nada que hacer.
    if (isFresh && all.length > 0) {
      setLoading(false);
      return;
    }

    // Sin datos → carga bloqueante; con datos rancios → refresco en segundo plano.
    if (all.length === 0) setLoading(true);

    fetchAndStore()
      .then((list) => {
        if (!active) return;
        setAll(list);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        if (!active) return;
        // Si hay datos rancios, seguimos mostrándolos; solo es error si no hay nada.
        setError(all.length === 0);
        setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { all, loading, error };
}

/** Búsqueda por texto sobre nombre, nombre científico y nombres comunes. */
export function searchSpecies(list: EnrichedSpecie[], query: string): EnrichedSpecie[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((s) =>
    `${s.name} ${s.scientificName} ${s.commonNames}`.toLowerCase().includes(q)
  );
}

/** Devuelve una especie por id desde el caché en memoria, si está disponible. */
export function getCachedSpecieById(id: number): EnrichedSpecie | undefined {
  return memCache?.find((s) => s.id === id);
}
