import type { IInvasiveSpecie } from '../services/invasiveSpecie';

/**
 * Caché persistente (localStorage) de la lista de especies, con estrategia
 * stale-while-revalidate. Los datos de especies invasoras cambian muy poco,
 * así que se guardan durante 7 días para aliviar la carga de la API.
 */

const KEY = 'ei-species-cache';
const VERSION = 1; // súbelo si cambia la forma de los datos guardados
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

interface CacheEnvelope {
  v: number;
  t: number; // epoch ms en que se guardó
  data: IInvasiveSpecie[];
}

export interface CacheRead {
  data: IInvasiveSpecie[];
  /** true si el caché sigue dentro del TTL (no requiere refresco). */
  fresh: boolean;
  /** epoch ms en que se guardó. */
  savedAt: number;
}

/** Lee el caché; devuelve null si no existe, está corrupto o es de otra versión. */
export function readSpeciesCache(): CacheRead | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEnvelope;
    if (!parsed || parsed.v !== VERSION || !Array.isArray(parsed.data) || parsed.data.length === 0) {
      return null;
    }
    const age = Date.now() - parsed.t;
    return { data: parsed.data, fresh: age < TTL_MS, savedAt: parsed.t };
  } catch {
    return null;
  }
}

/** Guarda la lista en caché con la marca de tiempo actual. */
export function writeSpeciesCache(data: IInvasiveSpecie[]): void {
  if (typeof window === 'undefined' || !Array.isArray(data) || data.length === 0) return;
  try {
    const envelope: CacheEnvelope = { v: VERSION, t: Date.now(), data };
    window.localStorage.setItem(KEY, JSON.stringify(envelope));
  } catch {
    // Cuota llena / modo privado: ignorar, el caché es best-effort.
  }
}

/** Borra el caché (útil para forzar un refresco manual). */
export function clearSpeciesCache(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
