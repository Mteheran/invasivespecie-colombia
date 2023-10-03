import {SPECIE_BY_ID} from "../utils/constants";

export interface InvasiveSpecie {
  id: number;
  name: string;
  scientificName: string;
  commonNames: string;
  impact: string;
  manage: string;
  riskLevel: number;
  urlImage: string;
}

export default async function getInvasiveSpecie(id: string): Promise<InvasiveSpecie> {
  const response = await fetch(`${SPECIE_BY_ID}/${id}`);
  return await response.json();
}