import {SPECIE_BY_ID, URL} from "../utils/constants";

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

export default async function getInvasiveSpecie(id: string): Promise<IInvasiveSpecie> {
  const response = await fetch(`${SPECIE_BY_ID}/${id}`);
  return await response.json();
}

export async function fetchAllInvasiveSpecies(param: string): Promise<IInvasiveSpecie[]>{
  const response = await fetch(`${URL}\\search\\${param}`);
  return response.json();
}