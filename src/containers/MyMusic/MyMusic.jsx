import React, { useEffect } from "react";
import { AUTHORIZE_URL } from "constant";
const MyMusic = () => {
   // useEffect(() => {
   //    authorizeApi.getAuthorize();
   // }, []);
   console.log(AUTHORIZE_URL);
   return (
      <div className="mymusic">
         <div className="container mymusic-container">my music</div>
      </div>
   );
};

export default MyMusic;
