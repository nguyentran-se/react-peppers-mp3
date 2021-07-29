import React from "react";
import { useParams } from "react-router-dom";

const Playlist = () => {
   const { slug } = useParams();
   return (
      <div className="playlist">
         <div className="container playlist-container">playlist id: {slug}</div>
      </div>
   );
};

export default Playlist;
