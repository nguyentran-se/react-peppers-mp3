import React from "react";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Header from "common/Header/Header";
import Player from "common/PLayer/Player";

import "./PublicLayout.scss";
const PublicLayout = (props) => {
   return (
      <div className="layout">
         <div className="layout-wrapper">
            <div className="layout-left">
               <Sidebar />
            </div>
            <div className="layout-right">
               <Header />
               <main>{props.children}</main>
            </div>
         </div>
         <Player />
      </div>
   );
};

export default PublicLayout;
