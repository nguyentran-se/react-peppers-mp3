import Button from "common/UI/Button/Button";
import React from "react";
import "./ToolbarItem.scss";
const ToolbarItem = ({ icon, specificIcon }) => {
   return (
      <Button icon={icon} custom="toolbar-item">
         {specificIcon}
      </Button>
   );
};

export default ToolbarItem;
