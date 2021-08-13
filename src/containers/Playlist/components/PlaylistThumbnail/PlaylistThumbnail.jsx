import CardModal from "common/ListCard/CardModal/CardModal";
import Button from "common/UI/Button/Button";
import React, { useState } from "react";
// import srcImg from "assets/images/test.jpg";
import "./PlaylistThumbnail.scss";
const PlaylistThumbnail = ({ image }) => {
   const [onHover, setOnHover] = useState(false);
   const onMouseEnterHandler = () => {
      setOnHover(true);
   };

   const onMouseLeaveHandler = () => {
      setOnHover(false);
   };
   return (
      <div
         className="card-img playlist-img"
         onMouseEnter={onMouseEnterHandler}
         onMouseLeave={onMouseLeaveHandler}>
         <CardModal onHover={onHover} defaultButton={false}>
            <Button
               icon="action-play ic-svg-play-circle"
               custom="button--card"
               hover
            />
         </CardModal>
         <img src={image?.url} alt="" />
      </div>
   );
};

export default PlaylistThumbnail;
