import React from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import "./Toolbar.scss";
import ThemeIcon from "assets/images/ThemIcon";
import UserPhoto from "assets/images/UserPhoto";
const Toolbar = () => {
   return (
      <section className="toolbar">
         <div className="toolbar-wrapper">
            <ToolbarItem specificIcon={<ThemeIcon />} />
            <ToolbarItem
               customIcon="icon--large-size icon-toolbar"
               icon="ic-upload"
            />
            <ToolbarItem
               customIcon="icon--large-size icon-toolbar"
               icon="ic-settings"
            />
            <ToolbarItem specificIcon={<UserPhoto />} />
         </div>
      </section>
   );
};

export default Toolbar;
