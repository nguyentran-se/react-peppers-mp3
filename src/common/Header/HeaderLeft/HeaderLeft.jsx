import MyIcon from "common/UI/MyIcon/MyIcon";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./HeaderLeft.scss";
const HeaderLeft = () => {
   return (
      <div className="header-left">
         <div className="btn-group--nav">
            <MyIcon
               listIcon={["ic-back", "ic-forward"]}
               customIcon="icon icon--header-nav"
            />
         </div>
         <SearchBar />
      </div>
   );
};

export default HeaderLeft;
