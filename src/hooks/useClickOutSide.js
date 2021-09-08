import { useEffect } from "react";

export const useClickOutSide = (elementRef) => {
   useEffect(() => {
      const clickOutSideHandler = (e) => {
         if (!elementRef?.current.contains(e.target)) {
            elementRef.current.classList.remove("show");
            elementRef.current.classList.add("hide");
         }
      };
      document.addEventListener("mousedown", clickOutSideHandler);
      return () => {
         document.removeEventListener("mousedown", clickOutSideHandler);
      };
   }, [elementRef]);
};
