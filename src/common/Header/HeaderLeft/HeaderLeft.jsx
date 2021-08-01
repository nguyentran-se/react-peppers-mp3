import Button from "common/UI/Button/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./HeaderLeft.scss";
const HeaderLeft = () => {
   const history = useHistory();
   console.log(history);
   return (
      <div className="header-left">
         <div className="btn-group--nav">
            <Button icon="ic-back icon--header-nav" disabled />
            <Button icon="ic-forward icon--header-nav" />
         </div>
         <SearchBar />
      </div>
   );
};

export default HeaderLeft;
