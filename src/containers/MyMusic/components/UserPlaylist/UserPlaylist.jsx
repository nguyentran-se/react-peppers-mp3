import userApi from "api/userApi";
import Category from "common/ListCategory/Category/Category";
import React, { useEffect, useState } from "react";

const UserPlaylist = () => {
   const [userPlaylists, setUserPlaylists] = useState([]);

   useEffect(() => {
      const requestGetUserPlaylists = async () => {
         const playlistsData = await userApi.getUserPlaylists();
         setUserPlaylists(playlistsData.items);
         // console.log(playlistsData);
      };
      requestGetUserPlaylists();
   }, []);

   return (
      <div className="user-playlist">
         <Category categoryName={"Playlist"} cards={userPlaylists} />
      </div>
   );
};

export default UserPlaylist;
