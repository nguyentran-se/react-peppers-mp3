import musicApi from "api/musicApi";
import ListCard from "common/ListCard/ListCard";
import Button from "common/UI/Button/Button";
import PlaylistThumbnail from "containers/Playlist/components/PlaylistThumbnail/PlaylistThumbnail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Cate.scss";
const Cate = () => {
   const { slug } = useParams();
   const [cate, setCate] = useState();
   const [playlistsOfCate, setPlaylistsOfCate] = useState();

   useEffect(() => {
      const requestGetData = async () => {
         const playlistsParams = {
            country: "VN",
            locale: "en_us",
            limit: 10,
            offset: 0,
         };
         // category
         const cate = await musicApi.getSpecificCategory(slug);
         const { playlists } = await musicApi.getPlaylistsOfCategory(
            slug,
            playlistsParams
         );
         console.log(playlists);
         setCate(cate);
         setPlaylistsOfCate(playlists);
      };
      requestGetData();
      return () => {};
   }, [slug]);
   return (
      <div className="cate">
         <div className="container cate-container">
            <div className="cate-intro">
               <PlaylistThumbnail
                  image={cate?.icons[0].url}
                  custom="cate-img"
               />
               <div className="cate-right">
                  <h2 className="cate-intro__title">{cate?.name}</h2>
                  <div className="cate-buttons">
                     <Button icon="ic-play" custom="button--normal">
                        PHÁT NHẠC
                     </Button>
                     <Button icon="ic-addfriend" custom="button--normal">
                        QUAN TÂM
                     </Button>
                  </div>
               </div>
            </div>
            <div className="cate-playlists">
               <ListCard cards={playlistsOfCate?.items} wrapItems />
            </div>
         </div>
      </div>
   );
};

export default Cate;
