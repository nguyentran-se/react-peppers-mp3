import Button from "common/UI/Button/Button";
import React from "react";
import "./CardMenu.scss";
const CardMenu = ({ menuList, top, left }) => {
   const transformedButtons = menuList.map(
      ({ icon, display, iconRight }, index) => (
         <li key={index} className="card-menu__item">
            <Button
               custom="button--normal button-card-menu"
               icon={icon}
               iconRight={iconRight}
               style={
                  iconRight === "ic-floating" && {
                     padding: "10px 20px 10px 43px",
                     color: "var(--text-secondary)",
                  }
               }>
               {display}
            </Button>
         </li>
      )
   );
   return (
      <div className="card-menu" style={{ top: top, left: left }}>
         <div className="card-menu__wrapper">
            <ul className="card-menu__list">{transformedButtons}</ul>
         </div>
      </div>
   );
};

export default CardMenu;
