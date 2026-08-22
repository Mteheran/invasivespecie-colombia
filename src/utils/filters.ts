import type { EnrichedSpecie } from '../services/invasiveSpecie';
import type { HabitatKey } from '../data/speciesExtra';

export type KindFilter = 'all' | 'animal' | 'plant';
export type HabitatGroup = 'aquatic' | 'andean';
export type SortKey = 'risk_desc' | 'risk_asc' | 'name_asc';

export interface Filters {
  kind: KindFilter;
  highRiskOnly: boolean;
  habitat: HabitatGroup[];
  sort: SortKey;
}

export const DEFAULT_FILTERS: Filters = {
  kind: 'all',
  highRiskOnly: false,
  habitat: [],
  sort: 'risk_desc',
};

const HABITAT_MAP: Record<HabitatGroup, HabitatKey[]> = {
  aquatic: ['acuatico', 'marino', 'semiacuatico'],
  andean: ['andino'],
};

/** Lee los filtros desde los parámetros de la URL. */
export function parseFilters(params: URLSearchParams): Filters {
  const kind = params.get('kind');
  const risk = params.get('risk');
  const habitat = (params.get('habitat') ?? '')
    .split(',')
    .filter((h): h is HabitatGroup => h === 'aquatic' || h === 'andean');
  const sort = params.get('sort');

  return {
    kind: kind === 'animal' || kind === 'plant' ? kind : 'all',
    highRiskOnly: risk === 'high',
    habitat,
    sort: sort === 'risk_asc' || sort === 'name_asc' ? sort : 'risk_desc',
  };
}

/** Aplica los filtros a los parámetros de la URL (mutando una copia). */
export function applyFiltersToParams(params: URLSearchParams, filters: Filters): URLSearchParams {
  const next = new URLSearchParams(params);
  if (filters.kind === 'all') next.delete('kind');
  else next.set('kind', filters.kind);

  if (filters.highRiskOnly) next.set('risk', 'high');
  else next.delete('risk');

  if (filters.habitat.length) next.set('habitat', filters.habitat.join(','));
  else next.delete('habitat');

  if (filters.sort === 'risk_desc') next.delete('sort');
  else next.set('sort', filters.sort);

  return next;
}

export function isDefaultFilters(f: Filters): boolean {
  return f.kind === 'all' && !f.highRiskOnly && f.habitat.length === 0;
}

/** Filtra y ordena una lista de especies enriquecidas. */
export function filterAndSort(list: EnrichedSpecie[], filters: Filters): EnrichedSpecie[] {
  const habitatKeys = filters.habitat.flatMap((g) => HABITAT_MAP[g]);

  const filtered = list.filter((s) => {
    if (filters.kind !== 'all' && s.extra.kind !== filters.kind) return false;
    if (filters.highRiskOnly && s.riskLevel < 2) return false;
    if (habitatKeys.length && !habitatKeys.includes(s.extra.habitatKey)) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case 'risk_asc':
      sorted.sort((a, b) => a.riskLevel - b.riskLevel || a.name.localeCompare(b.name, 'es'));
      break;
    case 'name_asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      break;
    default: // risk_desc
      sorted.sort((a, b) => b.riskLevel - a.riskLevel || a.name.localeCompare(b.name, 'es'));
  }
  return sorted;
}
