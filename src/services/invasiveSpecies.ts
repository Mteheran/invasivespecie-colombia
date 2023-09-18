import { URL } from '../utils/constants'

interface IinvasiveSpecies {

}

export default async function InvasiveSpecies(): Promise<IinvasiveSpecies>{
  const request = fetch(URL).then(() => {
    return {}
  });

  return request;
}