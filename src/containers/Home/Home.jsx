import musicApi from "api/musicApi";
import Heading from "common/Heading/Heading";
import ListCard from "common/ListCard/ListCard";
import dayjs from "dayjs";
import { useCheckMounted, useScrollLoadMore } from "hooks";
import React, { useEffect, useState } from "react";
import "./Home.scss";

const Home = () => {
   const [playlists, setPlaylists] = useState({
      items: [],
      next: null,
      previous: null,
   });
   const [message, setMessage] = useState(null);
   const isMounted = useCheckMounted();
   const [loadMore, setLoadMore] = useScrollLoadMore(playlists.next);

   /**
    * @description request feature playlists, get next if has
    */
   useEffect(() => {
      const requestData = async () => {
         const params = {
            country: "VN",
            locale: "vi_vn",
            timestamp: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
            limit: 15,
            offset: 0,
         };
         let data;
         if (playlists.next) data = await musicApi.getNext(playlists.next);
         else {
            data = await musicApi.getFeaturedPlaylists(params);
            const { message: messageData } = data;
            isMounted && setMessage(messageData);
         }
         const { playlists: playlistsData } = data;
         // console.log(playlistsData);

         const updatedPlaylists = {
            items: [...playlists.items, ...playlistsData.items],
            next: playlistsData.next,
            previous: playlistsData.previous,
         };
         isMounted && setPlaylists(updatedPlaylists);
      };
      if (loadMore) {
         requestData();
         setLoadMore(false);
      }
   }, [isMounted, loadMore, playlists, setLoadMore]);

   return (
      <div className="home">
         <div className="container home-container">
            <Heading heading={"featured playlists"} message={message} />
            <div className="home-list">
               <ListCard cards={playlists?.items} wrapItems />
            </div>
         </div>
      </div>
   );
};

export default Home;
