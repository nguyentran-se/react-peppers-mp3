import CategoryHeader from "common/ListCategory/CategoryHeader/CategoryHeader";
import ListCategory from "common/ListCategory/ListCategory";
import PlaylistSongs from "common/PlaylistSongs/PlaylistSongs";
import sortBy from "lodash/sortBy";
import React from "react";

const SearchAll = ({ query, allResult }) => {
   const params = new URLSearchParams();
   params.append("q", query);
   const listSection = [
      {
         name: "Playlist/Album",
         customHref: `playlist?${params}`,
         cards: allResult?.playlists?.items.concat(allResult?.albums.items),
         id: 1,
      },
      {
         name: "Artist",
         customHref: `artist?${params}`,
         cards: sortBy(
            allResult?.artists?.items.filter(
               ({ images, followers }) => images.length && followers.total
            ),
            (o) => o.followers.total
         ).reverse(),
         shape: "circle",
         oneButton: true,
         id: 2,
      },
      {
         name: "Show",
         customHref: `show?${params}`,
         cards: allResult?.shows?.items,
         id: 3,
      },
      {
         name: "Episode",
         customHref: `show?${params}`,
         cards: allResult?.episodes?.items,
         id: 4,
      },
   ];

   return (
      <>
         {/* <SearchHeader query={query} /> */}
         <div className="search-all">
            <div style={{ marginBottom: "30px" }}>
               <CategoryHeader
                  categoryHref={`/search/track?q=${query}`}
                  categoryName={"Bài hát"}
                  cardLength={1}
               />
               <PlaylistSongs
                  songs={allResult?.tracks?.items.slice(0, 5)}
                  customInstance={{
                     noHeader: true,
                  }}
               />
            </div>
            {listSection[0].cards && (
               <ListCategory
                  listCategory={listSection.filter(
                     (section) => section.cards.length
                  )}
               />
            )}
         </div>
      </>
   );
};

export default SearchAll;
