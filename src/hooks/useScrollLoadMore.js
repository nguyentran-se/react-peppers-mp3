import { useEffect, useState } from "react";

const useScrollLoadMore = (nextLink) => {
   const [loadMore, setLoadMore] = useState(true);
   //scroll to end and hasNextLink, then setLoadMore(true)
   useEffect(() => {
      const layoutRight = document.querySelector(".layout-right");
      const scrollHandler = () => {
         const scrollHeight = layoutRight.scrollHeight;
         const scrollTop = layoutRight.scrollTop;
         const clientHeight = layoutRight.clientHeight;
         //scrollTop + clientHeight >= scrollHeight - 300 if want loadMore sooner
         if (scrollTop + clientHeight === scrollHeight && nextLink)
            setLoadMore(true);
      };
      layoutRight.addEventListener("scroll", scrollHandler);
      return () => {
         layoutRight.removeEventListener("scroll", scrollHandler);
      };
   }, [nextLink]);

   return [loadMore, setLoadMore];
};

export { useScrollLoadMore };
