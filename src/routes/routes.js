import React from "react";
import PublicLayout from "hoc/PublicLayout/PublicLayout";

const Home = React.lazy(() => import("containers/Home/Home"));
const MyMusic = React.lazy(() => import("containers/MyMusic/MyMusic"));

const routes = [
   {
      path: "/",
      exact: true,
      layout: PublicLayout,
      component: Home,
   },
   {
      path: "/my-music",
      exact: true,
      layout: PublicLayout,
      component: MyMusic,
   },
];

export default routes;
