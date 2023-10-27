import { IInvasiveSpecie } from "../invasiveSpecie";

export default async function InvasiveSpecies(): Promise<IInvasiveSpecie>{
  const request = Promise.resolve({
    id: 0,
    name: '',
    scientificName: '',
    commonNames: '',
    impact: '',
    manage: '',
    riskLevel: 0,
    urlImage: ''
  });

  return request;
}