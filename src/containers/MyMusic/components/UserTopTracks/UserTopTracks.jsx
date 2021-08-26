import userApi from "api/userApi";
import React from "react";
import { useEffect } from "react";

const UserTopTracks = () => {
   useEffect(() => {
      const requestGetTopTracks = async () => {
         const params = {};
         const data = await userApi.getTopTracks();
         console.log(data);
      };
      requestGetTopTracks();
   }, []);
   return <div className="user-top"></div>;
};

export default UserTopTracks;
