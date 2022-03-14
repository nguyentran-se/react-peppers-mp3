import GeneralHelmet from "common/GeneralHelmet/GeneralHelmet";
import { SEO } from "constant";
import { useSearch } from "hooks";
import React, { useRef } from "react";
import { Route, useRouteMatch } from "react-router";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import "./Search.scss";
import service from "./service";

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
  // console.log(allTotalOfResult);
  // console.log(allResult);
  return (
    <div className="search">
      <SearchHeader query={query} allTotalOfResult={allTotalOfResult} />
      <div className="container search-container">
        {/* <SearchAll all={all} query={query} /> */}
        {service
          .getSubRoutes(matchPath)
          .map(({ path, exact, component: Component }) => (
            <Route
              path={path}
              exact={exact}
              render={(props) => {
                let kindOfSearch = path.split("/")[2];
                kindOfSearch =
                  kindOfSearch.charAt(0).toUpperCase() + kindOfSearch.slice(1);
                return (
                  <>
                    <GeneralHelmet
                      page={{
                        title: `${SEO.search.title} ${kindOfSearch} - ${query}`,
                        description: SEO.search.description,
                      }}></GeneralHelmet>
                    <Component {...props} query={query} allResult={allResult} />
                  </>
                );
              }}
              key={path}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
