import userApi from "api/userApi";
import PlaylistSongs from "containers/Playlist/components/PlaylistSongs/PlaylistSongs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserTopTracks = () => {
   const [topTracks, setTopTracks] = useState();

   useEffect(() => {
      const requestGetTopTracks = async () => {
         const params = {
            limit: 50,
            offset: 0,
         };
         const data = await userApi.getTopTracks(params);
         const updatedTopTracks = {
            items: data.items,
            next: data.next,
            previous: data.previous,
         };
         console.log(updatedTopTracks);
         setTopTracks(updatedTopTracks);
      };
      requestGetTopTracks();
   }, []);
   return (
      <div className="user-top">
         <PlaylistSongs songs={topTracks?.items} />
      </div>
   );
};

export default UserTopTracks;
