import React from "react";
import { LIST_TOPIC } from "constant";
import Topic from "../Topic/Topic";
import "./Banner.scss";
const Banner = () => {
   const banner = LIST_TOPIC[0];
   return (
      <div className="banner">
         <Topic
            topicHeader={banner.topicHeader}
            cards={banner.cards}
            type={banner.type}
            isBanner={!banner.isBanner}
         />
      </div>
   );
};

export default Banner;
