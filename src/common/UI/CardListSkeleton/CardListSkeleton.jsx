import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const cardListSkeleton = (cardShape, quantity) => {
   const duration = 1.2;
   const transformedSkeleton = Array(quantity)
      .fill()
      .map((_, index) => (
         <div className={`card card--${cardShape}`} key={index}>
            <SkeletonTheme
               color={"var(--loading-bg)"}
               highlightColor={"hsl(0, 0%, 100%, 0.4)"}>
               <div className="card-wrapper">
                  <div className="card-img">
                     <Skeleton
                        style={{
                           position: "absolute",
                           height: "100%",
                        }}
                        duration={duration}
                     />
                  </div>
                  <h4 className="card-title">
                     <Skeleton duration={duration} height={17} />
                  </h4>
                  <h5 className="card-artist">
                     <Skeleton duration={duration} height={17} width={100} />
                  </h5>
               </div>
            </SkeletonTheme>
         </div>
      ));
   return transformedSkeleton;
};

export default cardListSkeleton;
