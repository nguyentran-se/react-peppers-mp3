import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollTop = () => {
   const { pathname } = useLocation();
   useEffect(() => {
      document.querySelector(".layout-right").scrollTo(0, 0);
   }, [pathname]);
};
export { useScrollTop };
