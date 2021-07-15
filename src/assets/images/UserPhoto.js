import React from "react";
import img from "./user-photo.jpg";
const UserPhoto = () => {
   return (
      <div className="user-photo">
         <img src={img} alt="user" />
      </div>
   );
};

export default UserPhoto;
