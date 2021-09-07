import Button from "common/UI/Button/Button";
import React from "react";
import "./ToolbarItem.scss";
const ToolbarItem = ({ icon, specificIcon, clicked }) => {
   return (
      <Button icon={icon} custom="toolbar-item" clicked={clicked}>
         {specificIcon}
      </Button>
   );
};

export default ToolbarItem;
