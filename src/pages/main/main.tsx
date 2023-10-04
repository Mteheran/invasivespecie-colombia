import * as React from "react";
import Searcher from '../../templates/searcher'
import { SearcherContext } from "../../context";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getInvasiveSpecie from "../../services/invasiveSpecie";
import InvasiveSpecieModal from "./invasiveSpecieModal";
import IinvasiveSpecie from "../../interfaces/IinvasiveSpecie";

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<IinvasiveSpecie>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(id && id!= null) {
      getInvasiveSpecie(id as string)
      .then(data => {
        if(id !== "")
        {
          setIsModalOpen(true)
          setData(data)
        }
      })
      .catch(error => console.error(error));
    }
  }, [id]);

  return (
    <SearcherContext.Provider value={{}}>
      <Searcher/>
      <div>
        {data && (
        <InvasiveSpecieModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={data}
        />
      )}
      </div>
    </SearcherContext.Provider>
    
  );
}

export default Main;
