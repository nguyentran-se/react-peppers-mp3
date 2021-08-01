import Button from "common/UI/Button/Button";
import React from "react";
import "./SearchBar.scss";
const SearchBar = () => {
   return (
      <div className="search-bar">
         <div className="search-bar__wrapper">
            <Button icon="ic-search icon--large-size icon--search-custom" />
            <div style={{ width: "10px" }}></div>
            <div className="input-wrapper">
               <input
                  className="input-search"
                  type="text"
                  placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV…"
               />
            </div>
         </div>
      </div>
   );
};

export default SearchBar;
