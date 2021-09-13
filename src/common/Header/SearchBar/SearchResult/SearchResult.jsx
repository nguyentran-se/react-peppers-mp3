/**
 * @implements search on searchbar
 * 1. try search on searchbar. Text and Image(suggestionResults) results
 */
import React from "react";
import { useHistory } from "react-router";
import SearchSuggestion from "../SearchSuggestion/SearchSuggestion";
import "./SearchResult.scss";
import sortBy from "lodash/sortBy";

const SearchResult = ({ searchResults, query, searchBarRef }) => {
   let textResults = [];
   let transformedTextResults = [];
   let suggestionResults = null;
   // push to search page.
   // get query params call api render
   const history = useHistory();

   const navigateToDetailResult = (name) => {
      const params = new URLSearchParams();
      params.append("q", name);
      history.push(`/search/all?${params}`);
      searchBarRef.current.classList.add("hide");
      searchBarRef.current.classList.remove("show");
   };

   if (searchResults) {
      const keys = {
         ARTISTS: "artists",
         TRACKS: "tracks",
         ALBUMS: "albums",
         PLAYLLISTS: "playlists",
         SHOW: "shows",
         EPISODES: "episodes",
      };
      //textResults
      //filter artist to get clear data
      const filterHighFollowerArtists = sortBy(
         searchResults[keys.ARTISTS].items,
         (o) => o.followers.total
      )
         .reverse()
         .filter((art) => art.images.length)
         .slice(0, 2);

      textResults = filterHighFollowerArtists
         .concat(searchResults[keys.TRACKS].items.slice(0, 2))
         .concat([{ id: -1, name: `${query}` }]);

      transformedTextResults = textResults.map(({ id, name }) => (
         <li
            className="search-result__item"
            key={id}
            onClick={() => navigateToDetailResult(name)}>
            <i className="icon ic-search"></i>
            <div className="search-result__name line-clamp--1">
               {id === -1 ? `Tìm kiếm "${name}"` : name}
            </div>
         </li>
      ));
      //suggestionResults
      suggestionResults = filterHighFollowerArtists
         .concat(searchResults[keys.ALBUMS].items.slice(0, 2))
         .concat(searchResults[keys.PLAYLLISTS].items.slice(0, 2));
   }

   return (
      <div className="search-result">
         <div className="search-result__wrapper">
            <ul className="search-result__list">{transformedTextResults}</ul>
            <SearchSuggestion
               suggestionResults={suggestionResults}
               searchBarRef={searchBarRef}
            />
         </div>
      </div>
   );
};

export default SearchResult;
