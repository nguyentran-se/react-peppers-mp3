import React, { memo } from "react";
import "./Header.scss";
import HeaderLeft from "./HeaderLeft/HeaderLeft";
import Toolbar from "./Toolbar/Toolbar";
const Header = ({ headerRef }) => {
   return (
      <header className="header">
         <div className="header-wrapper" ref={headerRef}>
            <HeaderLeft />
            <Toolbar />
         </div>
      </header>
   );
};

export default memo(Header);
