import React from "react";
import ListCard from "common/ListCard/ListCard";
import "./Topic.scss";
import MyIcon from "common/UI/MyIcon/MyIcon";
import { Link } from "react-router-dom";
const Topic = ({ topicHeader, cards, type, isBanner }) => {
   return (
      <>
         {!isBanner && (
            <div className="topic">
               {topicHeader?.topicTitle && (
                  <div className="topic-header">
                     {topicHeader?.isLinked ? (
                        <Link to="#topic-title" className="topic-title">
                           {topicHeader.topicTitle}
                           <i className={`icon--medium-size ic-go-right`}></i>
                        </Link>
                     ) : (
                        <h3 className="topic-title">
                           {topicHeader.topicTitle}
                        </h3>
                     )}
                     {topicHeader?.hasIcon && (
                        <div className="topic-header__icons">
                           <MyIcon
                              listIcon={["ic-go-left", "ic-go-right"]}
                              customIcon="icon--medium-size"
                              typeWrapper="div"
                           />
                        </div>
                     )}
                  </div>
               )}
               <ListCard cards={cards} cardType={type} />
            </div>
         )}
      </>
   );
};

export default Topic;

/* <a href="#topic-title" className="topic-title">
                        {topicHeader.topicTitle}
                     </a> */

/* <MyIcon
                        listIcon={["ic-go-right"]}
                        link="#topic-title"
                        title={topicHeader.topicTitle}
                        iconLeft={false}
                        customIcon={"icon--medium-size"}
                        customClass="topic-title"
                     /> */
