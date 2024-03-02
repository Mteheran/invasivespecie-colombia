import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Searcher from '../../templates/searcher';
import { SearcherContext, declaration } from "../../context";
import { fetchInvasiveSpecie, fetchAllInvasiveSpecies, IInvasiveSpecie, getAllInvasiveSpecies } from "../../services/invasiveSpecie";

function Main() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const search = params.get("search");

  const [specie, setSpecie] = useState<IInvasiveSpecie>(declaration.itemDetail);
  const [listOfInvasiveSpecies, setListOfInvasiveSpecies] = useState<IInvasiveSpecie[]>([]);
  const [cardsLeft, setCardsLeft] = useState<IInvasiveSpecie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesLeft, setPagesLeft] = useState(0);
  const pageSize = 6;

  const observerTarget = useRef(null);

  useEffect(() => {
    if (id) {
      fetchInvasiveSpecie(id)
        .then(data => {
          if (data) {
            setIsModalOpen(true);
            setSpecie(data);
          }
        })
        .catch(error => {
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
          setListOfInvasiveSpecies(data.splice(0, pageSize))
          setCardsLeft(data.splice(pageSize));
          setPagesLeft(0);
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error)
        });
    }
    else {
      setIsLoading(true);
      getAllInvasiveSpecies(pageSize, 1)
        .then(data => {
          setListOfInvasiveSpecies(data['data']);
          setCurrentPage(data['page']);
          setPagesLeft(data['pageCount'] - data['page']);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
        });
    }
  }, [search]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (pagesLeft > 0) {
            setIsLoading(true);
            getAllInvasiveSpecies(pageSize, currentPage + 1)
              .then(data => {
                setListOfInvasiveSpecies([...listOfInvasiveSpecies, ...data['data']]);
                setCurrentPage(data['page']);
                setPagesLeft(data['pageCount'] - data['page']);
                setIsLoading(false);
              })
              .catch(error => {
                setIsLoading(false);
                console.error(error);
              });
          }
          if (cardsLeft.length > 0) {
            setListOfInvasiveSpecies([...listOfInvasiveSpecies, ...cardsLeft.splice(0, pageSize)]);
            setCardsLeft(cardsLeft.splice(pageSize));
          }
        }
      });
    });

    const currentTarget = observerTarget.current;
  
    if (currentTarget) {
      observer.observe(currentTarget);
    }
  
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [pagesLeft, cardsLeft, currentPage, listOfInvasiveSpecies]);

  const provider = useMemo(() => ({
    itemDetail: specie,
    itemList: listOfInvasiveSpecies,
    isModalOpen,
    searchValue: search ?? '',
    setIsModalOpen: setIsModalOpen,
    isLoading: isLoading,
  }), [specie, listOfInvasiveSpecies, isModalOpen, search, isLoading]);

  return (
    <SearcherContext.Provider value={provider}>
        <Searcher />
        <div ref={observerTarget} style={{ color: 'white' }}> LOL </div>
    </SearcherContext.Provider>
  );
}

export default Main;
