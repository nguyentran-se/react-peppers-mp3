import userApi from "api/userApi";
import Category from "common/ListCategory/Category/Category";
import React, { useEffect, useState } from "react";

const UserAlbum = () => {
   const [userAlbums, setUserAlbums] = useState([]);

   useEffect(() => {
      const requestGetUserAlbums = async () => {
         const albumsData = await userApi.getUserAlBums();
         setUserAlbums(albumsData.items);
         // console.log(albumsData.items);
      };
      requestGetUserAlbums();
   }, []);

   return (
      <div className="user-albums">
         <Category categoryName={"Album"} cards={userAlbums} />
      </div>
   );
};

export default UserAlbum;
