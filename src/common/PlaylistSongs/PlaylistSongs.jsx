import React from "react";
import PlaylistSong from "./PlaylistSong/PlaylistSong";
import "./PlaylistSongs.scss";
const PlaylistSongs = ({ songs, customInstance, album }) => {
   // console.log(songs);
   let transformedSongs;
   if (songs) {
      // console.log(songs[0].track.artists);
      // component render ListSong for playlist, album, artist
      transformedSongs = songs.map((s) => {
         let song;
         if (s.track || s.track === null) song = s.track;
         else song = s;
         return (
            song !== null && (
               <PlaylistSong
                  src={song?.album?.images[0].url || album.images[0].url}
                  name={song?.name}
                  artists={song?.artists}
                  albumName={song?.album?.name || album.name}
                  albumId={song?.album?.id || album.id}
                  ago={
                     s.addedAt ||
                     song?.album?.releaseDate ||
                     album.releaseDate ||
                     null
                  }
                  time={song?.durationMs}
                  key={song?.id}
               />
            )
         );
      });
   }
   return (
      <div
         className={`playlist-songs ${
            customInstance ? customInstance.customClass : ""
         }`}>
         {customInstance?.noHeader || (
            <div className="playlist-songs__header">
               <span>Bài hát</span>
               <span>Album</span>
               <span>ngày thêm</span>
               <span>time</span>
            </div>
         )}
         <div className="playlist-songs__list">{transformedSongs}</div>
      </div>
   );
};

export default PlaylistSongs;