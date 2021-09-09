// import NewReleases from "containers/NewReleases/NewReleases";
import { lazy } from "react";
// import PublicLayout from "hoc/PublicLayout/PublicLayout";

const Home = lazy(() => import("containers/Home/Home"));
const MyMusic = lazy(() => import("containers/MyMusic/MyMusic"));
const Cates = lazy(() => import("containers/Cates/Cates"));
const Playlist = lazy(() => import("containers/Playlist/Playlist"));
const Artist = lazy(() => import("containers/Artist/Artist"));
const Notfound = lazy(() => import("containers/Notfound/Notfound"));
const Cate = lazy(() => import("containers/Cate/Cate"));
const NewReleases = lazy(() => import("containers/NewReleases/NewReleases"));
const Search = lazy(() => import("containers/Search/Search"));

const routes = [
   {
      path: "/",
      exact: true,
      layout: "PublicLayout",
      component: Home,
   },
   {
      path: "/my-music",
      exact: false,
      layout: "PublicLayout",
      component: MyMusic,
   },
   {
      path: "/categories",
      exact: true,
      layout: "PublicLayout",
      component: Cates,
   },
   {
      path: "/new-releases",
      exact: true,
      layout: "PublicLayout",
      component: NewReleases,
   },

   {
      path: "/categories/:slug",
      exact: true,
      layout: "PublicLayout",
      component: Cate,
   },
   {
      path: "/playlist/:slug",
      exact: true,
      layout: "PublicLayout",
      component: Playlist,
   },
   {
      path: "/artist/:slug",
      exact: false,
      layout: "PublicLayout",
      component: Artist,
   },
   {
      path: "/album/:slug",
      exact: true,
      layout: "PublicLayout",
      component: Playlist,
   },
   {
      path: "/search/",
      exact: false,
      layout: "PublicLayout",
      component: Search,
   },

   {
      path: "*",
      exact: true,
      layout: "PublicLayout",
      component: Notfound,
   },
];

export default routes;
