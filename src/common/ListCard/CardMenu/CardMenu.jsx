import Button from "common/UI/Button/Button";
import React from "react";
import "./CardMenu.scss";
import { CARD_MENU_BUTTONS } from "constant";
const CardMenu = ({ top, left }) => {
   const transformedButtons = CARD_MENU_BUTTONS.map(({ icon, display }) => (
      <li key={icon} className="card-menu__item">
         <Button custom="button--normal button-card-menu" icon={icon}>
            {display}
         </Button>
      </li>
   ));
   return (
      <div className="card-menu" style={{ top: top, left: left }}>
         <div className="card-menu__wrapper">
            <ul className="card-menu__list">{transformedButtons}</ul>
         </div>
      </div>
   );
};

export default CardMenu;
