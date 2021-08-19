import musicApi from "api/musicApi";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "./Playlist.scss";
import PlaylistThumbnail from "./components/PlaylistThumbnail/PlaylistThumbnail";
import PlaylistSongs from "./components/PlaylistSongs/PlaylistSongs";
import { msToTime } from "helper";
const Playlist = () => {
   const { slug } = useParams();
   const [playlist, setPlaylist] = useState(null);
   const matchPath = useRouteMatch().url;
   const totalTimeRef = useRef();
   useEffect(() => {
      const requestGetAPlaylist = async () => {
         try {
            const params = {
               fields:
                  "description,followers,id,images,name," +
                  "tracks.items(added_at,track(album(id,images,name,type),artists,duration_ms,id,name,preview_url,type,uri))," +
                  "tracks.next,tracks.previous,tracks.total,type",
            };
            let playlist;
            if (matchPath.includes("album"))
               playlist = await musicApi.getSpecificAlbum(slug);
            else playlist = await musicApi.getSpecificPlaylist(slug, params);

            // get totaltime of playlist
            totalTimeRef.current = playlist.tracks.items.reduce(
               (time, item) => {
                  if (item.track) return item.track.durationMs + time;
                  return item.durationMs + time;
               },
               0
            );
            // const data = await musicApi.getSpecificPlaylist(slug);
            setPlaylist(playlist);
         } catch (error) {
            console.log(error);
         }
      };
      requestGetAPlaylist();
      return () => {};
   }, [slug, matchPath]);
   console.log(playlist);

   return (
      <div className="playlist">
         <div className="container playlist-container">
            <div className="playlist-main">
               <div className="playlist-info">
                  <PlaylistThumbnail
                     image={playlist?.images[0].url}
                     custom={"playlist-img"}
                  />
                  <div className="playlist-info__song">
                     <h3 className="playlist-info__name">{playlist?.name}</h3>
                     <h5 className="playlist-info__desc">
                        {playlist?.tracks.total} bài hát -{" "}
                        {msToTime(totalTimeRef.current)}
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
               </div>
               <div className="playlist-content">
                  <div className="playlist-content__description">
                     {playlist?.description}
                  </div>
                  <PlaylistSongs
                     songs={playlist?.tracks.items}
                     album={matchPath.includes("album") && playlist}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Playlist;
