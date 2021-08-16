import { lazy } from "react";
// import PublicLayout from "hoc/PublicLayout/PublicLayout";

const Home = lazy(() => import("containers/Home/Home"));
const MyMusic = lazy(() => import("containers/MyMusic/MyMusic"));
const Cate = lazy(() => import("containers/Cate/Cate"));
const Playlist = lazy(() => import("containers/Playlist/Playlist"));
const Artist = lazy(() => import("containers/Artist/Artist"));
const routes = [
   {
      path: "/",
      exact: true,
      layout: "PublicLayout",
      component: Home,
   },
   {
      path: "/my-music",
      exact: true,
      layout: "PublicLayout",
      component: MyMusic,
   },
   {
      path: "/categories",
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
];

export default routes;
