import CardMenu from "common/ListCard/CardMenu/CardMenu";
import { useState } from "react";
import usePortal from "react-cool-portal";

const useMenu = ({ menuList, width = 250, height = 200, fixed = false }) => {
   const DISTANCE_POINTER_WITH_MENU = 10;

   const { Portal, isShow, toggle, hide } = usePortal({
      defaultShow: false,
      containerId: "peppers-portal",
   });

   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

   /**
    * @event clickButtonMoreOnCard
    * @implements
    *  - get position of mouse, get width height of screen
    *  - if(portal hide) setMenuPosition -> avoid redundance of setState.
    *  - hide if catch scroll event
    */
   const cardMenuHandler = (e) => {
      e.stopPropagation();
      const screenWidth = window.innerWidth,
         screenHeight = window.innerHeight,
         x = e.pageX,
         y = e.pageY,
         menuWith = width + DISTANCE_POINTER_WITH_MENU,
         menuHeight = height + DISTANCE_POINTER_WITH_MENU;

      document.querySelector(".layout-right").onscroll = () => {
         hide();
      };

      toggle();
      if (fixed) {
         setMenuPosition({ x: screenWidth - width - 84, y: 65 });
         return;
      }
      if (!isShow) {
         if (screenWidth - x >= menuWith && screenHeight - y >= menuHeight) {
            setMenuPosition({
               x: x + DISTANCE_POINTER_WITH_MENU,
               y: y + DISTANCE_POINTER_WITH_MENU,
            });
            // console.log("ĐỦ");
         } else if (
            screenWidth - x < menuWith &&
            screenHeight - y < menuHeight
         ) {
            setMenuPosition({ x: x - menuWith, y: y - menuHeight });
            // console.log("THIẾU CẢ 2");
         } else if (screenWidth - x < menuWith) {
            setMenuPosition({ x: x - menuWith, y });
            // console.log("THIẾU X");
         } else {
            setMenuPosition({ x, y: y - menuHeight });
            // console.log("THIẾU Y");
         }
      }
   };

   const Menu = () => {
      return (
         <Portal>
            <CardMenu
               top={menuPosition.y}
               left={menuPosition.x}
               menuList={menuList}
            />
         </Portal>
      );
   };

   return { Menu, cardMenuHandler };
};

export default useMenu;
