import React from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import "./Toolbar.scss";
import ThemeIcon from "assets/images/ThemIcon";
import UserPhoto from "common/User/UserPhoto/UserPhoto";
const Toolbar = () => {
   return (
      <section className="toolbar">
         <div className="toolbar-wrapper">
            <ToolbarItem specificIcon={<ThemeIcon />} />
            <ToolbarItem icon="ic-upload icon--large-size icon-toolbar" />
            <ToolbarItem icon="ic-settings icon--large-size icon-toolbar" />
            <ToolbarItem specificIcon={<UserPhoto />} />
         </div>
      </section>
   );
};

export default Toolbar;
