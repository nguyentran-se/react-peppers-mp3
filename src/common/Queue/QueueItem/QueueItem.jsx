import Button from "common/UI/Button/Button";
import { useMenu } from "hooks";
import React from "react";
import { Link } from "react-router-dom";
import "./QueueItem.scss";
import { QUEUE_MENU_BUTTONS } from "constant";
import PropTypes from "prop-types";
import playerApi from "api/playerApi";
import { useSelector } from "react-redux";
import { selectDeviceId } from "selectors";
const propTypes = {
   src: PropTypes.string,
   name: PropTypes.string,
   artists: PropTypes.array,
   custom: PropTypes.string,
   active: PropTypes.bool,
};
const QueueItem = ({
   src,
   name,
   artists,
   buttons,
   custom = "",
   active,
   uri,
}) => {
   const { Menu, cardMenuHandler } = useMenu({ menuList: QUEUE_MENU_BUTTONS });
   let transformedArtist;

   if (artists) {
      let length = artists.length - 1;
      transformedArtist = artists.map((art, index) => (
         <span key={art.id}>
            <Link
               to={`/artist/${art.id}`}
               className="queue-song__artist artist-hover">
               {art.name}
            </Link>
            {length !== index && ", "}
         </span>
      ));
   }
   const deviceId = useSelector(selectDeviceId);
   const playClickedHandler = () => {
      const params = {
         device_id: deviceId,
      };
      if (uri) {
         const option = {
            uris: [uri],
         };
         playerApi.playURI(params, option);
      }
   };
   return (
      <div className="queue-item" onClick={playClickedHandler}>
         <div
            className={`queue-item__wrapper ${custom} ${
               active ? "active" : ""
            }`}>
            <div className="queue-item__left">
               <div className="card-img queue-item__img">
                  <img src={src} alt="queue item" />
                  <div className="queue-item__backdrop"></div>
                  <Button icon="ic-play" hoverNoShape />
               </div>
               <div className="queue-song">
                  <div className="queue-song__name line-clamp--1">{name}</div>
                  <div className="queue-song__artists line-clamp--1">
                     {transformedArtist}
                  </div>
               </div>
            </div>
            {buttons || (
               <div className="queue-item__actions">
                  <Button icon="ic-like" hover />
                  <Button icon="ic-more" hover clicked={cardMenuHandler} />
               </div>
            )}
         </div>
         <Menu />
      </div>
   );
};
QueueItem.propTypes = propTypes;
export default QueueItem;
