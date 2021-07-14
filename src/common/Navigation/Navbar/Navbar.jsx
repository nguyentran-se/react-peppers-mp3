import React from "react";
import NavItem from "../NavItem/NavItem";
import { NAV_MENU, NAV_PLAYLIST } from "constant";
import "./Navbar.scss";
import Separated from "common/UI/Separated/Separated";
const Navbar = ({ type }) => {
   let transformedNav;
   const transform = (navList) => {
      return navList.map(({ title, link, icon }, index) => (
         <NavItem key={index} title={title} link={link} icon={icon} />
      ));
   };
   let navClasses = ["navbar"];
   switch (type) {
      case "main":
         transformedNav = transform(NAV_MENU);
         navClasses.push("navbar-main");
         break;
      case "playlist":
         transformedNav = transform(NAV_PLAYLIST);
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
