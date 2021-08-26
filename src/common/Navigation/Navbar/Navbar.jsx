import Separated from "common/UI/Separated/Separated";
import { NAV_MENU } from "constant";
import React from "react";
import NavItem from "../NavItem/NavItem";
import "./Navbar.scss";

const Navbar = ({ type, navPlaylists }) => {
   let transformedNav;
   const transform = (navList) => {
      return navList.map(({ title, link, icon, exact }, index) => (
         <NavItem
            key={index}
            title={title}
            link={link}
            icon={icon}
            exact={exact}
         />
      ));
   };
   let navClasses = ["navbar"];
   switch (type) {
      case "main":
         transformedNav = transform(NAV_MENU);
         navClasses.push("navbar-main");
         break;
      case "playlist":
         transformedNav = transform(navPlaylists);
         navClasses.push("navbar-playlist");
         break;
      default:
         break;
   }
   return (
      <>
         <nav className={navClasses.join(" ")}>
            <ul className="navbar-menu">{transformedNav}</ul>
         </nav>
         {type !== "playlist" && <Separated />}
      </>
   );
};

export default Navbar;
