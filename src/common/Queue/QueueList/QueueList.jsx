import React from "react";
import "./QueueList.scss";
import QueueItem from "../QueueItem/QueueItem";
import PropTypes from "prop-types";
const propTypes = {
   queueList: PropTypes.array,
   type: PropTypes.string,
};
const QueueList = ({ queueList, currentTrack }) => {
   let transformedQueue;
   if (queueList) {
      transformedQueue = queueList.map((item) => {
         if (item.track) item = item.track;
         return (
            <QueueItem
               src={
                  item?.album?.images?.[0]?.url ||
                  currentTrack?.album?.images[0].url
               }
               name={item?.name}
               artists={item?.artists}
               uri={item?.uri}
               key={item?.id}
               active={item?.id === currentTrack?.id}
            />
         );
      });
   }
   return (
      <div className="queue-list">
         <div className="queue-list__wrapper">{transformedQueue}</div>
      </div>
   );
};
QueueList.propTypes = propTypes;
export default QueueList;
