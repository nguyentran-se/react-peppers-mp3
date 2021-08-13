import React from "react";
import PlaylistSong from "../PlaylistSong/PlaylistSong";
import "./PlaylistSongs.scss";
const PlaylistSongs = ({ songs }) => {
   let transformedSongs;
   if (songs) {
      // console.log(songs[0].track.artists);
      transformedSongs = songs.map((s) => (
         <PlaylistSong
            src={s.track.album.images[0].url}
            name={s.track.name}
            artists={s.track.artists}
            albumName={s.track.album.name}
            albumId={s.track.album.id}
            ago={s.addedAt}
            time={s.track.durationMs}
            key={s.track.id}
         />
      ));
   }
   return (
      <div className="playlist-songs">
         <div className="playlist-songs__header">
            <span>Bài hát</span>
            <span>Album</span>
            <span>ngày thêm</span>
            <span>time</span>
         </div>
         <div className="playlist-songs__list">{transformedSongs}</div>
      </div>
   );
};

export default PlaylistSongs;
