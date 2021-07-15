import MyIcon from "common/UI/MyIcon/MyIcon";
import React from "react";
import "./ToolbarItem.scss";
const ToolbarItem = ({ icon, specificIcon, customIcon }) => {
   return (
      <div className="toolbar-item">
         {specificIcon || (
            <MyIcon
               customIcon={customIcon}
               listIcon={[icon]}
               typeWrapper="div"
            />
         )}
      </div>
   );
};

export default ToolbarItem;
