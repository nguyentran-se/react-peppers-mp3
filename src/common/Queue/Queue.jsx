import playerApi from "api/playerApi";
import uniqBy from "lodash/uniqBy";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
   selectCurrentList,
   selectCurrentTrack,
} from "selectors/commonSelectors";
import "./Queue.scss";
import QueueHeader from "./QueueHeader/QueueHeader";
import QueueList from "./QueueList/QueueList";

const Queue = ({ toggleQueue }) => {
   const nodeRef = useRef(null);
   const currentListInfo = useSelector(selectCurrentList);
   const [tab, setTab] = useState("queue"); //queue||recent
   const [currentList, setCurrentList] = useState();
   const currentTrack = useSelector(selectCurrentTrack);
   const clickSetTabHandler = (tabName) => {
      setTab(tabName);
   };
   useEffect(() => {
      const requestGetTracksOfCurrentList = async () => {
         if (tab === "queue" && currentListInfo) {
            const listData = await playerApi.getTracksOfCurrentList(
               currentListInfo.type,
               currentListInfo.id
            );
            // console.log(listData);
            setCurrentList(listData); //albums: 0: artists,id,uri,name,
         } else if (tab === "recent") {
            const params = {
               before: new Date().getTime(),
            };
            const recentData = await playerApi.getRecentlyPlayedTracks(params);
            // console.log(recentData);
            recentData.items = uniqBy(
               recentData.items,
               (item) => item.track.id
            );
            setCurrentList(recentData);
         }
      };
      requestGetTracksOfCurrentList();
   }, [currentListInfo, tab]);
   return (
      <CSSTransition
         nodeRef={nodeRef}
         timeout={400}
         in={toggleQueue}
         mountOnEnter
         unmountOnExit
         classNames="queue">
         <div className="queue" ref={nodeRef}>
            <QueueHeader clicked={clickSetTabHandler} />
            <QueueList
               queueList={currentList?.items}
               type={currentListInfo?.type}
               currentTrack={currentTrack}
            />
         </div>
      </CSSTransition>
   );
};

export default memo(Queue);
