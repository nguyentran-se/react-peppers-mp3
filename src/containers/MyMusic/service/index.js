// import React from "react";
import { lazy } from "react";
import General from "../components/General/General";

const Playlist = lazy(() => import("../components/UserPlaylist/UserPlaylist"));
const Favourite = lazy(() => import("../components/Favourite/Favourite"));
const TopTracks = lazy(() =>
   import("../components/UserTopTracks/UserTopTracks")
);
const NotSupport = lazy(() => import("common/NotSupport/NotSupport"));

const service = {
   getNestedNav: (matchPath) => {
      const nestedNavList = [
         { name: "TỔNG QUAN", href: matchPath, component: General },
         {
            name: "PLAYLIST",
            href: matchPath + "/playlist",
            component: Playlist,
         },
         {
            name: "FAVOURITE",
            href: matchPath + "/favourite",
            component: Favourite,
         },
         {
            name: "TOP TRACKS",
            href: matchPath + "/top-tracks",
            component: TopTracks,
         },
         {
            name: "TẢI LÊN",
            href: matchPath + "/upload",
            component: NotSupport,
         },
      ];
      return nestedNavList;
   },
};

export default service;
