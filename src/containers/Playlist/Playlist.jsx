import musicApi from "api/musicApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Playlist.scss";
import PlaylistThumbnail from "./components/PlaylistThumbnail/PlaylistThumbnail";
import PlaylistSongs from "./components/PlaylistSongs/PlaylistSongs";
const Playlist = () => {
   const { slug } = useParams();
   const [playlist, setPlaylist] = useState(null);
   useEffect(() => {
      const requestGetAPlaylist = async () => {
         try {
            const params = {
               fields:
                  "description,followers,id,images,name," +
                  "tracks.items(added_at,track(album(id,images,name,type),artists,duration_ms,id,name,preview_url,type,uri))," +
                  "tracks.next,tracks.previous,type",
            };
            const playlist = await musicApi.getSpecificPlaylist(slug, params);
            // const data = await musicApi.getSpecificPlaylist(slug);
            setPlaylist(playlist);
         } catch (error) {
            console.log(error);
         }
      };
      requestGetAPlaylist();
      return () => {};
   }, [slug]);
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
                     <h5 className="playlist-info__follower">
                        {playlist?.followers.total.toLocaleString("vi-VN")}{" "}
                        người yêu thích
                     </h5>
                  </div>
               </div>
               <div className="playlist-content">
                  <div className="playlist-content__description">
                     {playlist?.description}
                  </div>
                  <PlaylistSongs songs={playlist?.tracks.items} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Playlist;
