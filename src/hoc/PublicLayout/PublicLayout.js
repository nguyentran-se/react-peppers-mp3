import React, { useState } from "react";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Header from "common/Header/Header";
import Player from "common/PLayer/Player";
import "./PublicLayout.scss";
import Queue from "common/Queue/Queue";
const PublicLayout = (props) => {
   const [openQueue, setOpenQueue] = useState(false);
   const clickedHandler = () => {
      setOpenQueue((prevOpen) => !prevOpen);
   };
   return (
      <div className="layout">
         <div className="layout-wrapper">
            <div className="layout-left">
               <Sidebar />
            </div>
            <div className="layout-right">
               <Header />
               <main>{props.children}</main>
               <Queue openQueue={openQueue} />
            </div>
         </div>
         <Player clicked={clickedHandler} />
      </div>
   );
};

export default PublicLayout;
