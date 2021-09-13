import { numberFormatter } from "helper";
import React from "react";
import { NavLink } from "react-router-dom";
import "./SearchHeader.scss";

const SearchHeader = ({ query, allTotalOfResult }) => {
   const params = new URLSearchParams();
   params.append("q", query);
   // console.log(params);
   const navList = [
      {
         id: "all",
         display: "tất cả",
      },
      {
         id: "track",
         display: "Bài hát",
         quantity: numberFormatter(allTotalOfResult?.tracks),
      },
      {
         id: "playlist",
         display: "Playlist/Album",
         quantity: numberFormatter(
            allTotalOfResult?.playlists + allTotalOfResult?.albums
         ),
      },
      {
         id: "artist",
         display: "Nghệ sĩ",
         quantity: numberFormatter(allTotalOfResult?.artists),
      },
      {
         id: "show",
         display: "Show/Episode",
         quantity: numberFormatter(
            allTotalOfResult?.shows + allTotalOfResult?.episodes
         ),
      },
   ];

   const transformedNavList = navList.map(({ id, display, quantity }) => (
      <li className="search-nav__item" key={id}>
         <NavLink to={`${id}?${params}`} className="search-nav__link" key={id}>
            {display}{" "}
            {quantity && <span className="search-nav__result">{quantity}</span>}
         </NavLink>
      </li>
   ));

   return (
      <div className="search-header">
         <h2 className="search-header__title">Kết quả tìm kiếm</h2>
         <ul className="search-nav">{transformedNavList}</ul>
      </div>
   );
};

export default SearchHeader;
