import ThemeIcon from "assets/images/ThemeIcon";
import { Theme } from "common/UI/Modal";
import UserPhoto from "common/User/UserPhoto/UserPhoto";
import { SETTING_MENU } from "constant/cardMenu";
import { useMenu, useModal } from "hooks";
import React from "react";
import "./Toolbar.scss";
import ToolbarItem from "./ToolbarItem/ToolbarItem";

const Toolbar = () => {
   const { Modal, show } = useModal();
   const { Menu, cardMenuHandler } = useMenu({
      menuList: SETTING_MENU,
      fixed: true,
   });
   return (
      <section className="toolbar">
         <div className="toolbar-wrapper">
            <ToolbarItem specificIcon={<ThemeIcon />} clicked={show} />
            <ToolbarItem icon="ic-upload icon--large-size icon-toolbar" />
            <ToolbarItem
               icon="ic-settings icon--large-size icon-toolbar"
               clicked={cardMenuHandler}
            />
            <ToolbarItem specificIcon={<UserPhoto />} />
         </div>
         <Modal heading={"Giao diện"}>
            <Theme />
         </Modal>
         <Menu />
      </section>
   );
};

export default Toolbar;
