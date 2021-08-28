import React, { memo } from "react";
import Logo from "common/UI/Logo/Logo";
import "./Sidebar.scss";
import Navbar from "common/Navigation/Navbar/Navbar";
import AddPlaylist from "../AddPlaylist/AddPlaylist";
import RemindBox from "common/UI/RemindBox/RemindBox";

const Sidebar = ({ navPlaylists, isLoggedIn }) => {
   // console.log(navPlaylists);
   return (
      <aside className="sidebar">
         <div className="sidebar-wrapper">
            <Logo />
            <Navbar type="main" />
            {isLoggedIn ? (
               <div className="sidebar__navbar--scroll">
                  <Navbar type="playlist" navPlaylists={navPlaylists} />
               </div>
            ) : (
               <>
                  <h3 className="sidebar-note">
                     Sign-in to get your playlists
                  </h3>
                  <RemindBox />
               </>
            )}
            <AddPlaylist />
         </div>
      </aside>
   );
};

export default memo(Sidebar);
/* <h3 className="sidebar-note">Sign-in to get your playlists</h3> */
