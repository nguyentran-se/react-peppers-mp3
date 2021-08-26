import musicApi from "api/musicApi";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "./Playlist.scss";
import PlaylistThumbnail from "./components/PlaylistThumbnail/PlaylistThumbnail";
import PlaylistSongs from "../../common/PlaylistSongs/PlaylistSongs";
import { msToTime } from "helper";
import PlaylistInfo from "./components/PlaylistInfo/PlaylistInfo";
const Playlist = () => {
   const { slug } = useParams();
   const matchPath = useRouteMatch().url;
   const totalTimeRef = useRef();
   const [playlist, setPlaylist] = useState(null);

   useEffect(() => {
      const requestGetAPlaylist = async () => {
         try {
            const params = {
               fields:
                  "description,followers,id,images,name," +
                  "tracks.items(added_at,track(album(id,images,name,type),artists,duration_ms,id,name,preview_url,type,uri))," +
                  // "tracks.next,tracks.previous,tracks.total,type",
                  "tracks(next,previous,total,limit),type",
            };
            let playlist;
            if (matchPath.includes("album"))
               playlist = await musicApi.getSpecificAlbum(slug);
            else playlist = await musicApi.getSpecificPlaylist(slug, params);
            console.log(playlist);

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

   return (
      <div className="playlist">
         <div className="container playlist-container">
            <div className="playlist-main">
               <div className="playlist-info">
                  <PlaylistThumbnail
                     image={playlist?.images[0].url}
                     custom={"playlist-img"}
                  />
                  <PlaylistInfo
                     playlist={playlist}
                     matchPath={matchPath}
                     totalTime={msToTime(totalTimeRef.current)}
                  />
               </div>
               <div className="playlist-content">
                  <div
                     className="playlist-content__description"
                     dangerouslySetInnerHTML={{
                        __html: playlist?.description,
                     }}>
                     {/* {playlist?.description} */}
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
