import IinvasiveSpecie from '../interfaces/IinvasiveSpecie';
import { URL } from '../utils/constants'

export default async function InvasiveSpecies(): Promise<IinvasiveSpecie[]>{
  const response = await fetch(URL);
  return response.json();
}