import ListCard from "common/ListCard/ListCard";
import CategoryHeader from "common/ListCategory/CategoryHeader/CategoryHeader";
import { useSearch } from "hooks";
import React, { useRef } from "react";

const SearchShow = ({ query }) => {
   const params = useRef({
      q: query,
      type: "show,episode", //show,episode",
      limit: 50,
      offset: 0,
   });
   const [result] = useSearch(query, params.current);
   // console.log(result);
   return (
      <div className="search-playlist">
         <CategoryHeader categoryName={"Show/Episode"} cardLength={1} />
         <ListCard
            cards={result?.shows?.items.concat(
               result?.episodes?.items.filter((item) => item !== null)
            )}
            wrapItems
         />
      </div>
   );
};

export default SearchShow;
