import { numberFormatter } from "helper";
import React from "react";
import { NavLink } from "react-router-dom";
import "./SearchHeader.scss";

const SearchHeader = ({ query, allTotalOfResult }) => {
   const params = new URLSearchParams();
   params.append("q", query);
   // console.log(params);
   return (
      <div className="search-header">
         <h2 className="search-header__title">Kết quả tìm kiếm</h2>
         <ul className="search-nav">
            <li className="search-nav__item">
               <NavLink to={`all?${params}`} className="search-nav__link">
                  Tất cả
               </NavLink>
            </li>
            <li className="search-nav__item">
               <NavLink to={`track?${params}`} className="search-nav__link">
                  Bài hát{" "}
                  <span className="search-nav__result">
                     {numberFormatter(allTotalOfResult?.tracks)}
                  </span>
               </NavLink>
            </li>
            <li className="search-nav__item">
               <NavLink to={`playlist?${params}`} className="search-nav__link">
                  Playlist/album{" "}
                  <span className="search-nav__result">
                     {numberFormatter(
                        allTotalOfResult?.playlists + allTotalOfResult?.albums
                     )}
                  </span>
               </NavLink>
            </li>
            <li className="search-nav__item">
               <NavLink to={`artist?${params}`} className="search-nav__link">
                  Nghệ sĩ{" "}
                  <span className="search-nav__result">
                     {numberFormatter(allTotalOfResult?.artists)}
                  </span>
               </NavLink>
            </li>
            <li className="search-nav__item">
               <NavLink to={`show?${params}`} className="search-nav__link">
                  Show/Episode{" "}
                  <span className="search-nav__result">
                     {numberFormatter(
                        allTotalOfResult?.shows + allTotalOfResult?.episodes
                     )}
                  </span>
               </NavLink>
            </li>
         </ul>
      </div>
   );
};

export default SearchHeader;
