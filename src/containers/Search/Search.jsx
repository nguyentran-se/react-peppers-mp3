import { useSearch } from "hooks";
import React, { lazy, useRef } from "react";
import { Route, useRouteMatch } from "react-router";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import "./Search.scss";

const SearchAll = lazy(() => import("./components/SearchAll/SearchAll"));
const SearchTrack = lazy(() => import("./components/SearchTrack/SearchTrack"));
const SearchPlaylist = lazy(() =>
   import("./components/SearchPlaylist/SearchPlaylist")
);
const SearchArtist = lazy(() =>
   import("./components/SearchArtist/SearchArtist")
);
const SearchShow = lazy(() => import("./components/SearchShow/SearchShow"));

const Search = () => {
   const matchPath = useRouteMatch().url;

   //params = queryString.parse(window.location.search), params.q
   const getParamsFromURL = new URLSearchParams(window.location.search);

   const query = getParamsFromURL.get("q");

   const params = useRef({
      q: query,
      type: "album,artist,playlist,track,show,episode", //show,episode",
      limit: 10,
      offset: 0,
   });

   const [allResult] = useSearch(query, params.current);

   //get all total to render SearchHeader
   let allTotalOfResult;
   if (allResult)
      allTotalOfResult = Object.keys(allResult).reduce((acc, currentKey) => {
         return { ...acc, [currentKey]: allResult[currentKey].total };
      }, {});
   console.log(allTotalOfResult);

   const subRoutes = [
      {
         path: `${matchPath}/all`,
         component: SearchAll,
         exact: false,
      },
      {
         path: `${matchPath}/track`,
         component: SearchTrack,
         exact: false,
      },
      {
         path: `${matchPath}/playlist`,
         component: SearchPlaylist,
         exact: false,
      },
      {
         path: `${matchPath}/artist`,
         component: SearchArtist,
         exact: false,
      },
      {
         path: `${matchPath}/show`,
         component: SearchShow,
         exact: false,
      },
   ];

   return (
      <div className="search">
         <SearchHeader query={query} allTotalOfResult={allTotalOfResult} />
         <div className="container search-container">
            {/* <SearchAll all={all} query={query} /> */}
            {subRoutes.map(({ path, exact, component: Component }) => (
               <Route
                  path={path}
                  exact={exact}
                  render={(props) => (
                     <Component
                        {...props}
                        query={query}
                        allResult={allResult}
                     />
                  )}
                  key={path}
               />
            ))}
         </div>
      </div>
   );
};

export default Search;
