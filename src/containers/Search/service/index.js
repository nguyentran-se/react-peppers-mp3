import { lazy } from "react";

const SearchAll = lazy(() => import("../components/SearchAll/SearchAll"));
const SearchTrack = lazy(() => import("../components/SearchTrack/SearchTrack"));
const SearchPlaylist = lazy(() =>
   import("../components/SearchPlaylist/SearchPlaylist")
);
const SearchArtist = lazy(() =>
   import("../components/SearchArtist/SearchArtist")
);
const SearchShow = lazy(() => import("../components/SearchShow/SearchShow"));

const service = {
   getSubRoutes: (matchPath) => {
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
      return subRoutes;
   },
};

export default service;
