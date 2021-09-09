import React from "react";
import { Link } from "react-router-dom";
import { numberFormatter } from "helper";

const SearchSuggestion = ({ suggestionResults, searchBarRef }) => {
   let transformedSuggestionResults = null;
   // console.log(suggestionResults);
   if (suggestionResults) {
      transformedSuggestionResults = suggestionResults.map(
         ({ id, name, type, images, ...rest }) => (
            <li
               className={"search-result__playlist"}
               key={id}
               onClick={() => {
                  searchBarRef.current.classList.add("hide");
                  searchBarRef.current.classList.remove("show");
               }}>
               <Link to={`/${type}/${id}`}>
                  <div className="search-result__item">
                     <div
                        className={`search-result__img ${
                           type === "artist" ? "circle" : ""
                        }`}>
                        <img src={images[0]?.url} alt="suggestion" />
                     </div>
                     <div className="search-result__info">
                        <div className="search-result__title line-clamp--1">
                           {name}
                        </div>
                        <div className="search-result__type line-clamp--1">
                           <span>{type}</span>{" "}
                           {rest?.followers &&
                              `• ${numberFormatter(
                                 rest?.followers.total,
                                 1
                              )} Followers`}
                        </div>
                     </div>
                  </div>
               </Link>
            </li>
         )
      );
   }
   return (
      transformedSuggestionResults && (
         <ul className="search-result__suggestion">
            {transformedSuggestionResults}
         </ul>
      )
   );
};

export default SearchSuggestion;
