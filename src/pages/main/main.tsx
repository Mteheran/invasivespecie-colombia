import * as React from "react";
import Searcher from '../../templates/searcher'
import { SearcherContext } from "../../context";
// import { useParams } from "react-router-dom";

function Main() {
  // let { query, id } = useParams();

  return (
    <SearcherContext.Provider value={{}}>
      <Searcher/>
    </SearcherContext.Provider>
    
  );
}

export default Main;
