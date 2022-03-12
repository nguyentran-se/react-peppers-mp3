import { HISTORY_SEARCH } from "constant";
import { getLocalStorage, setLocalStorage } from "helper";

const VISIBLE_SEARCHS = 6;
const MAX_LENGTH = 16;

export const historySearch = (name) => {
   let historySearch = getLocalStorage(HISTORY_SEARCH);
   if (!historySearch) historySearch = [];
   const length = historySearch.length;
   if (length === MAX_LENGTH)
      historySearch = historySearch.slice(MAX_LENGTH - VISIBLE_SEARCHS);
   const startIndex =
      length - VISIBLE_SEARCHS > 0 ? length - VISIBLE_SEARCHS : 0;
   //[1,1,2,2] -> [1,2]
   historySearch = [...new Set([...historySearch, name])];
   //get 6 newest search from localStorage
   historySearch = historySearch.slice(startIndex);
   // .map((historyName, index) => ({ id: index, name: historyName }));
   // console.log(name, historySearch);
   setLocalStorage(HISTORY_SEARCH, historySearch);
};
