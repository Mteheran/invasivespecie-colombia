import { SPECIE_BY_ID, URL } from "../utils/constants";
import { getSpeciesExtra, type SpeciesExtra } from "../data/speciesExtra";

export interface IInvasiveSpecie {
  id: number;
  name: string;
  scientificName: string;
  commonNames: string;
  impact: string;
  manage: string;
  riskLevel: number;
  urlImage: string;
}

export interface IAllInvasiveSpecies {
  page: number;
  pageSize: number;
  totalRecords: number;
  pageCount: number;
  data: IInvasiveSpecie[];
}

/** Especie de la API + datos extra locales (categoría, hábitat, origen…). */
export type EnrichedSpecie = IInvasiveSpecie & { extra: SpeciesExtra };

export function enrichSpecie(specie: IInvasiveSpecie): EnrichedSpecie {
  return { ...specie, extra: getSpeciesExtra(specie) };
}

export async function fetchInvasiveSpecie(id: string): Promise<IInvasiveSpecie> {
  const response = await fetch(`${SPECIE_BY_ID}/${id}`);
  return await response.json();
}

/** Trae TODAS las especies de una vez (la API devuelve un array completo). */
export async function fetchEverySpecie(): Promise<IInvasiveSpecie[]> {
  const response = await fetch(URL);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchAllInvasiveSpecies(param: string): Promise<IInvasiveSpecie[]> {
  const response = await fetch(`${URL}/search/${encodeURIComponent(param)}`);
  return response.json();
}

export async function getAllInvasiveSpecies(pageSize: number, page: number): Promise<IAllInvasiveSpecies> {
  const response = await fetch(`${URL}/pagedList?Page=${page}&PageSize=${pageSize}`);
  return response.json();
}
