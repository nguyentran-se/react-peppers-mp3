import userApi from "api/userApi";
import PlaylistSongs from "common/PlaylistSongs/PlaylistSongs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Favourite = () => {
   const [favouriteSongs, setFavouriteSongs] = useState();
   useEffect(() => {
      const requestGetFavouriteTracks = async () => {
         const favourite = await userApi.getFavouriteTracks();
         console.log(favourite);
         const updatedFavourite = {
            items: favourite.items,
            next: favourite.next,
            previous: favourite.previous,
         };
         setFavouriteSongs(updatedFavourite);
      };
      requestGetFavouriteTracks();
   }, []);
   return (
      <div className="user-favourite">
         <PlaylistSongs songs={favouriteSongs?.items} />
      </div>
   );
};

export default Favourite;
