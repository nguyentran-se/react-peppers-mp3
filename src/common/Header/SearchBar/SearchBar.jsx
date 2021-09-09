import Button from "common/UI/Button/Button";
import { useClickOutSide } from "hooks";
import debounce from "lodash/debounce";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import "./SearchBar.scss";
import musicApi from "api/musicApi";
import SearchResult from "./SearchResult/SearchResult";
const SearchBar = () => {
   const searchBarRef = useRef(null);
   const [query, setQuery] = useState("");
   const [searchResults, setSearchResults] = useState();

   const onChangeHandler = async (e) => {
      const value = e.target.value.trim();
      setQuery(value);
      if (!value) {
         setSearchResults(null);
         return;
      }

      const params = {
         q: value,
         type: "album,artist,playlist,track", //show,episode",
         limit: 3,
         offset: 0,
      };
      const searchData = await musicApi.search(params);
      setSearchResults(searchData);
      // console.log(searchData);
   };

   //after milis call onchange
   const debounceOnChangeHandler = useMemo(
      () => debounce(onChangeHandler, 300),
      []
   );

   //unsubcribe debounce
   useEffect(() => {
      return () => {
         debounceOnChangeHandler.cancel();
      };
   }, [debounceOnChangeHandler]);

   //clickoutside search to hide search-result
   useClickOutSide(searchBarRef);

   return (
      <div className="search-bar hide" ref={searchBarRef}>
         <div className="search-bar__wrapper">
            <Button icon="ic-search icon--large-size icon--search-custom" />
            <div style={{ width: "10px" }}></div>
            <div className="search-input__wrapper">
               <input
                  defaultValue={""}
                  className="search-input"
                  type="text"
                  placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV…"
                  onChange={debounceOnChangeHandler}
                  onFocus={() => {
                     searchBarRef.current.classList.remove("hide");
                     searchBarRef.current.classList.add("show");
                  }}
                  // onKeyDown={(e) => console.log(e.keyCode)}
               />
               <SearchResult
                  searchResults={searchResults}
                  query={query}
                  searchBarRef={searchBarRef}
               />
            </div>
         </div>
      </div>
   );
};

export default memo(SearchBar);
