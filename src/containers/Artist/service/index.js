// import React from "react";
import { lazy } from "react";

const ArtistGeneral = lazy(() =>
   import("../Components/ArtistGeneral/ArtistGeneral")
);
const NotSupport = lazy(() => import("common/NotSupport/NotSupport"));

const service = {
   getNestedNav: (matchPath) => {
      const nestedNavList = [
         { name: "TỔNG QUAN", href: matchPath, component: ArtistGeneral },
         {
            name: "HOẠT ĐỘNG",
            href: matchPath + "/feed",
            component: NotSupport,
         },
         { name: "SỰ KIỆN", href: matchPath + "/event", component: NotSupport },
         {
            name: "BÀI HÁT",
            href: matchPath + "/bai-hat",
            component: NotSupport,
         },
         { name: "MV", href: matchPath + "/video", component: NotSupport },
         { name: "RADIO", href: matchPath + "/radio", component: NotSupport },
         { name: "TIN TỨC", href: matchPath + "/news", component: NotSupport },
      ];
      return nestedNavList;
   },
};

export default service;
