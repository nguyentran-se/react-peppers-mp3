import musicApi from "api/musicApi";
import Heading from "common/Heading/Heading";
import ListCard from "common/ListCard/ListCard";
import { useCheckMounted, useScrollLoadMore } from "hooks";
import React, { useEffect, useState } from "react";
import "./NewReleases.scss";
const NewReleases = () => {
   const [albums, setAlbums] = useState({
      items: [],
      next: null,
      previous: null,
   });
   const isMounted = useCheckMounted();
   const [loadMore, setLoadMore] = useScrollLoadMore(albums.next);
   useEffect(() => {
      const requestGetNewReleases = async () => {
         const params = {
            country: "VN",
            locale: "en_US",
            limit: 20,
            offset: 0,
         };
         let data;
         if (albums.next) data = await musicApi.getNext(albums.next);
         else data = await musicApi.getNewReleases(params);
         const { albums: albumsData } = data;
         console.log(albumsData);
         const updatedAlbums = {
            items: [...albums.items, ...albumsData.items],
            next: albumsData.next,
            previous: albumsData.previous,
         };
         isMounted && setAlbums(updatedAlbums);
      };
      if (loadMore) {
         requestGetNewReleases();
         setLoadMore(false);
      }
   }, [albums, isMounted, loadMore, setLoadMore]);
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
