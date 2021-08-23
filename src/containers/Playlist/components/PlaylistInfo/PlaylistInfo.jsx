import React from "react";
import PropTypes from "prop-types";

const propTypes = {
   playlist: PropTypes.object,
   matchPath: PropTypes.string,
   totalTime: PropTypes.string,
};
const PlaylistInfo = ({ playlist, matchPath, totalTime }) => {
   // const { name, totalTracks, followers, matchPath, copyrights } = playlist;
   return (
      <div className="playlist-info__song">
         <h3 className="playlist-info__name">{playlist?.name}</h3>
         <h5 className="playlist-info__desc">
            {playlist?.tracks.total} bài hát - {totalTime}
         </h5>
         <h5 className="playlist-info__desc">
            {playlist?.followers &&
               `${playlist?.followers.total.toLocaleString(
                  "vi-VN"
               )} người yêu thích`}
         </h5>
         {matchPath.includes("album") &&
            playlist?.copyrights.map((cr, index) => (
               <h5
                  className="playlist-info__desc playlist-intro__copy"
                  key={index}>
                  {cr.text}
               </h5>
            ))}
      </div>
   );
};

PlaylistInfo.propTypes = propTypes;

export default PlaylistInfo;
