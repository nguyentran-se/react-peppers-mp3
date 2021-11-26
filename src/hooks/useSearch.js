import musicApi from "api/musicApi";
import { useEffect, useState } from "react";

const useSearch = (query, params) => {
   const [result, setResult] = useState();

   useEffect(() => {
      const requestSearchAll = async () => {
         const searchData = await musicApi.search({ ...params, q: query });
         // console.log(searchData);
         setResult(searchData);
      };
      requestSearchAll();
   }, [query, params]);

   return [result];
};

export default useSearch;
