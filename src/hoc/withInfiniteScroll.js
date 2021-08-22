import React, { useEffect, useRef, useState } from "react";
// receive two params then return <Component/>
const withInfiniteScroll =
   (request, nextLink, ...args) =>
   (WrappedComponent) =>
   (props) => {
      // const [request, nextLink ] = args;
      const [loadMore, setLoadMore] = useState(true);

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
      }, []);
      console.log(nextLink);
      // console.log(props);
      return <WrappedComponent {...props} />;
   };

export default withInfiniteScroll;
