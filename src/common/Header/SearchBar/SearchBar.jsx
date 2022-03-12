import musicApi from "api/musicApi";
import Button from "common/UI/Button/Button";
import { HISTORY_SEARCH } from "constant";
import { getLocalStorage } from "helper";
import { useClickOutSide } from "hooks";
import debounce from "lodash/debounce";
import React, { memo, useEffect, useMemo, useReducer, useRef } from "react";
import "./SearchBar.scss";
import SearchResult from "./SearchResult/SearchResult";
function searchReducer(state, action) {
  switch (action.type) {
    case "NOT_HAVE_QUERY":
      return {
        ...state,
        query: "",
        searchResults: getLocalStorage(HISTORY_SEARCH)?.reverse(),
      };
    case "FETCH_SEARCH_RESULT":
      return {
        ...state,
        query: action.payload.query,
        searchResults: action.payload.searchResults,
      };
    default:
      break;
  }
}
function initSearchState(initState) {
  return {
    ...initState,
    searchResults: getLocalStorage(HISTORY_SEARCH)?.reverse(),
  };
}

const SearchBar = () => {
  const searchBarRef = useRef(null);

  const [state, dispatch] = useReducer(
    searchReducer,
    {
      query: "",
      searchResults: "",
    },
    initSearchState
  );

  const { query, searchResults } = state;

  const onChangeHandler = async (e) => {
    const value = e.target.value.trim();

    if (!value) {
      dispatch({ type: "NOT_HAVE_QUERY" });
      return;
    }

    const params = {
      q: value,
      type: "album,artist,playlist,track", //show,episode",
      limit: 10,
      offset: 0,
    };
    const searchData = await musicApi.search(params);
    dispatch({
      type: "FETCH_SEARCH_RESULT",
      payload: { query: value, searchResults: searchData },
    });
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
