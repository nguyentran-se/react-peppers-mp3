import Button from "common/UI/Button/Button";
import React from "react";
import "./ToolbarItem.scss";
const ToolbarItem = ({ icon, specificIcon, showThemeSetting }) => {
   return (
      <Button icon={icon} custom="toolbar-item" clicked={showThemeSetting}>
         {specificIcon}
      </Button>
   );
};

export default ToolbarItem;
