import musicApi from "api/musicApi";
import Heading from "common/Heading/Heading";
import ListCard from "common/ListCard/ListCard";
import React, { useEffect, useState } from "react";
import "./NewReleases.scss";
const NewReleases = () => {
   const [albums, setAlbums] = useState({
      items: [],
      next: null,
      previous: null,
   });
   useEffect(() => {
      const requestGetNewReleases = async () => {
         const params = {
            country: "VN",
            locale: "en_US",
            limit: 5,
            offset: 0,
         };
         const { albums: albumsData } = await musicApi.getNewReleases(params);
         console.log(albumsData);
         const updatedAlbums = {
            items: [...albums.items, ...albumsData.items],
            next: albumsData.next,
            previous: albumsData.previous,
         };
         setAlbums(updatedAlbums);
      };
      requestGetNewReleases();
   }, []);
   // console.log(albums);
   return (
      <div className="new">
         <div className="container new-container">
            <Heading heading={"mới phát hành"} icon={"ic-play"} />
            <div className="new-albums">
               <ListCard cards={albums.items} wrapItems />
            </div>
         </div>
      </div>
   );
};

export default NewReleases;
