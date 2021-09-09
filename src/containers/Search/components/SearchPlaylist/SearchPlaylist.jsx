import ListCard from "common/ListCard/ListCard";
import CategoryHeader from "common/ListCategory/CategoryHeader/CategoryHeader";
import { useSearch } from "hooks";
import React, { useRef } from "react";

const SearchPlaylist = ({ query }) => {
   const params = useRef({
      q: query,
      type: "playlist,album", //show,episode",
      limit: 50,
      offset: 0,
   });
   const [result] = useSearch(query, params.current);
   return (
      <div className="search-playlist">
         <CategoryHeader categoryName={"Playlist/Album"} cardLength={1} />
         <ListCard
            cards={result?.playlists.items.concat(result?.albums.items)}
            wrapItems
         />
      </div>
   );
};

export default SearchPlaylist;
