import { createContext } from 'react';
import { IInvasiveSpecie } from '../services/invasiveSpecie';

interface ISearcherContext {
  itemDetail: IInvasiveSpecie;
  itemList: IInvasiveSpecie[];
  isModalOpen: boolean;
  searchValue: string;
  setIsModalOpen: any;
}

export const declaration = {
  itemDetail: {
    id: 0,
    name: '',
    scientificName: '',
    commonNames: '',
    impact: '',
    manage: '',
    riskLevel: 0,
    urlImage: ''
  },
  itemList: [],
  isModalOpen: false,
  searchValue: '',
  setIsModalOpen: () => {}
} 

const SearcherContext = createContext<ISearcherContext>(declaration);

export default SearcherContext;