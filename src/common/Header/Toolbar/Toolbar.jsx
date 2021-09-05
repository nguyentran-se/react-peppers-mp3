import ThemeIcon from "assets/images/ThemeIcon";
import { Theme } from "common/UI/Modal";
import UserPhoto from "common/User/UserPhoto/UserPhoto";
import { useModal } from "hooks";
import React from "react";
import "./Toolbar.scss";
import ToolbarItem from "./ToolbarItem/ToolbarItem";

const Toolbar = () => {
   const { Modal, show } = useModal();
   return (
      <section className="toolbar">
         <div className="toolbar-wrapper">
            <ToolbarItem specificIcon={<ThemeIcon />} showThemeSetting={show} />
            <ToolbarItem icon="ic-upload icon--large-size icon-toolbar" />
            <ToolbarItem icon="ic-settings icon--large-size icon-toolbar" />
            <ToolbarItem specificIcon={<UserPhoto />} />
         </div>
         <Modal heading={"Giao diện"}>
            <Theme />
         </Modal>
      </section>
   );
};

export default Toolbar;
