import React, { memo } from "react";
import Logo from "common/UI/Logo/Logo";
import "./Sidebar.scss";
import Navbar from "common/Navigation/Navbar/Navbar";
import AddPlaylist from "../AddPlaylist/AddPlaylist";

const Sidebar = () => {
   return (
      <aside className="sidebar">
         <div className="sidebar-wrapper">
            <Logo />
            <Navbar type="main" />
            <div className="sidebar__navbar--scroll">
               <Navbar type="playlist" />
            </div>
            <AddPlaylist />
         </div>
      </aside>
   );
};

export default memo(Sidebar);
