import React, { useState, useEffect, useMemo } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchInvasiveSpecie(id)
        .then(data => {
          if (data) {
            setIsModalOpen(true);
            setSpecie(data);
            setIsLoading(false);
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error)
        });
    } else {
      setIsModalOpen(false);
      setSpecie(declaration.itemDetail);
    }
  }, [id]);

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      fetchAllInvasiveSpecies(search)
        .then(data => {
          setIsLoading(false);
          setListOfInvasiveSpecies(data)
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error)
        });
    }
    else {
      setListOfInvasiveSpecies([]);
    }
  }, [search]);

  const provider = useMemo(() => ({
    itemDetail: specie,
    itemList: listOfInvasiveSpecies,
    isModalOpen,
    searchValue: search ?? '',
    setIsModalOpen: setIsModalOpen,
    isLoading
  }), [specie, listOfInvasiveSpecies, isModalOpen, search, isLoading]);

  return (
    <SearcherContext.Provider value={provider}>
        <Searcher />
    </SearcherContext.Provider>
  );
}

export default Main;
