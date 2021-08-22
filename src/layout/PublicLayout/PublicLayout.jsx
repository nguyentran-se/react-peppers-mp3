import React, { useEffect, useRef, useState } from "react";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Header from "common/Header/Header";
import Player from "common/PLayer/Player";
import "./PublicLayout.scss";
import Queue from "common/Queue/Queue";
const PublicLayout = (props) => {
   const [toggleQueue, setToogleQueue] = useState(false);
   const layoutRightRef = useRef(null);
   const headerRef = useRef(null);

   useEffect(() => {
      layoutRightRef.current.onscroll = () => {
         const positionScroll = layoutRightRef.current.scrollTop;
         if (headerRef) {
            if (positionScroll === 0) {
               headerRef.current.style.boxShadow = "none";
               headerRef.current.style.backgroundColor = "transparent";
            } else {
               headerRef.current.style.boxShadow =
                  "0 3px 5px rgba(0, 0, 0, 0.1)";
               headerRef.current.style.backgroundColor = "inherit";
            }
         }
      };
   }, []);

   const clickedHandler = () => {
      setToogleQueue((prevOpen) => !prevOpen);
   };

   return (
      <div className="layout">
         <div className="layout-wrapper">
            <div className="layout-left">
               <Sidebar />
            </div>
            <div className="layout-right" ref={layoutRightRef}>
               <Header headerRef={headerRef} />
               <main>{props.children}</main>
               <Queue toggleQueue={toggleQueue} />
            </div>
         </div>
         <Player clicked={clickedHandler} toggleQueue={toggleQueue} />
      </div>
   );
};

export default PublicLayout;
