import Button from "common/UI/Button/Button";
import { useClickOutSide } from "hooks";
import debounce from "lodash/debounce";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./SearchBar.scss";
import queryString from "query-string";
const SearchBar = () => {
   const [query, setQuery] = useState("");

   const searchBarRef = useRef(null);

   const onChangeHandler = (e) => {
      const value = e.target.value;
      setQuery(value);
      console.log("Calling api");
      const params = {
         q: value,
         type: "album,artist,playlist,track,show,episode",
         limit: 3,
         offset: 0,
      };
      console.log(queryString.stringify(params));
   };

   //after milis call onchange
   const debounceOnChangeHandler = useMemo(
      () => debounce(onChangeHandler, 1000),
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
      <div className="search-bar" ref={searchBarRef}>
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
               <div className="search-result">
                  <div className="search-result__wrapper">
                     <ul className="search-result__list">
                        <li className="search-result__item ">
                           <i className="icon ic-search"></i>
                           <div className="search-result__name line-clamp--1">
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Voluptatem incidunt, quas
                              tempore repellendus modi odio iure. Dolorem maxime
                              praesentium facere quaerat beatae asperiores
                              ratione fuga, architecto quas dolor? Neque,
                              libero.
                           </div>
                        </li>
                        <li className="search-result__item ">
                           <i className="icon ic-search"></i>
                           <div className="search-result__name line-clamp--1">
                              Test
                           </div>
                        </li>
                        <li className="search-result__item ">
                           <i className="icon ic-search"></i>
                           <div className="search-result__name line-clamp--1">
                              Test
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchBar;
