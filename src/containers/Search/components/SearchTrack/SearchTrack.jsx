import CategoryHeader from "common/ListCategory/CategoryHeader/CategoryHeader";
import PlaylistSongs from "common/PlaylistSongs/PlaylistSongs";
import { useSearch } from "hooks";
import React, { useRef } from "react";

const SearchTrack = ({ query }) => {
   const params = useRef({
      q: query,
      type: "track", //show,episode",
      limit: 50,
      offset: 0,
   });
   const [result] = useSearch(query, params.current);
   console.log(result);
   return (
      <div className="search-track">
         <CategoryHeader categoryName={"Bài hát"} cardLength={1} />
         <PlaylistSongs
            songs={result?.tracks?.items}
            customInstance={{
               noHeader: true,
            }}
         />
      </div>
   );
};

export default SearchTrack;
