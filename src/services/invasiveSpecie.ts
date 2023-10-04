import IinvasiveSpecie from "../interfaces/IinvasiveSpecie";
import {SPECIE_BY_ID} from "../utils/constants";

export default async function getInvasiveSpecie(id: string): Promise<IinvasiveSpecie> {
  const response = await fetch(`${SPECIE_BY_ID}/${id}`);
  return await response.json();
}