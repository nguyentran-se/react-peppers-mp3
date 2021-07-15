import React from "react";
import "./Header.scss";
import HeaderLeft from "./HeaderLeft/HeaderLeft";
import Toolbar from "./Toolbar/Toolbar";
const Header = () => {
   return (
      <header className="header">
         <div className="header-wrapper">
            <HeaderLeft />
            <Toolbar />
         </div>
      </header>
   );
};

export default Header;
