import React, { useState } from "react";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Header from "common/Header/Header";
import Player from "common/PLayer/Player";
import "./PublicLayout.scss";
import Queue from "common/Queue/Queue";
const PublicLayout = (props) => {
   const [toggleQueue, setToogleQueue] = useState(false);
   const clickedHandler = () => {
      setToogleQueue((prevOpen) => !prevOpen);
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
               <Queue toggleQueue={toggleQueue} />
            </div>
         </div>
         <Player clicked={clickedHandler} toggleQueue={toggleQueue} />
      </div>
   );
};

export default PublicLayout;
