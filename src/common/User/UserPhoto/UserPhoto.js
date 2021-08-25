import React from "react";
import noUser from "assets/images/no-user.jpg";
import { useSelector } from "react-redux";
import { selectImage } from "selectors";
import "./UserPhoto.scss";
const UserPhoto = ({ medium }) => {
   const image = useSelector(selectImage);
   const userPhotoClasses = ["user-photo"];
   if (medium) userPhotoClasses.push("user-photo--medium");
   return (
      <div className={userPhotoClasses.join(" ")}>
         <img src={image || noUser} alt="user" />
      </div>
   );
};

export default UserPhoto;
