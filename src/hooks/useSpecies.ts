import { useEffect, useState } from 'react';
import { fetchEverySpecie, enrichSpecie, type EnrichedSpecie } from '../services/invasiveSpecie';

let cache: EnrichedSpecie[] | null = null;
let inflight: Promise<EnrichedSpecie[]> | null = null;

async function loadAll(): Promise<EnrichedSpecie[]> {
  if (cache) return cache;
  if (!inflight) {
    inflight = fetchEverySpecie()
      .then((list) => {
        cache = list.map(enrichSpecie);
        return cache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

interface UseSpeciesResult {
  all: EnrichedSpecie[];
  loading: boolean;
  error: boolean;
}

/** Carga (una sola vez, con caché de módulo) todas las especies enriquecidas. */
export function useSpecies(): UseSpeciesResult {
  const [all, setAll] = useState<EnrichedSpecie[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) return;
    let active = true;
    setLoading(true);
    loadAll()
      .then((list) => {
        if (active) {
          setAll(list);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
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
