import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Searcher from '../../templates/searcher';
import { SearcherContext, declaration } from "../../context";
import fetchInvasiveSpecie, { fetchAllInvasiveSpecies, IInvasiveSpecie } from "../../services/invasiveSpecie";

function Main() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const search = params.get("search");

  const [specie, setSpecie] = useState<IInvasiveSpecie>(declaration.itemDetail);
  const [listOfInvasiveSpecies, setListOfInvasiveSpecies] = useState<IInvasiveSpecie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchInvasiveSpecie(id)
        .then(data => {
          if (data) {
            setIsModalOpen(true);
            setSpecie(data);
          }
        })
        .catch(error => console.error(error));
    } else {
      setIsModalOpen(false);
      setSpecie(declaration.itemDetail);
    }
  }, [id]);

  useEffect(() => {
    if (search) {
      fetchAllInvasiveSpecies(search)
        .then(data => setListOfInvasiveSpecies(data))
        .catch(error => console.error(error));
    }
  }, [search]);

  return (
    <SearcherContext.Provider value={{
      itemDetail: specie,
      itemList: listOfInvasiveSpecies,
      isModalOpen,
      searchValue: search ?? ''
    }}>
      <Searcher />
    </SearcherContext.Provider>
  );
}

export default Main;
