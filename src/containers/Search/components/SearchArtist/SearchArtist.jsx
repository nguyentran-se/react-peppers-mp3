import ListCard from "common/ListCard/ListCard";
import CategoryHeader from "common/ListCategory/CategoryHeader/CategoryHeader";
import { useSearch } from "hooks";
import React, { useRef } from "react";

const SearchArtist = ({ query }) => {
   const params = useRef({
      q: query,
      type: "artist",
      limit: 50,
      offset: 0,
   });
   const [result] = useSearch(query, params.current);
   console.log(result);
   return (
      <div className="search-track">
         <CategoryHeader categoryName={"Artist"} cardLength={1} />
         <ListCard
            cards={result?.artists.items}
            wrapItems
            cardShape={"circle"}
         />
      </div>
   );
};

export default SearchArtist;
