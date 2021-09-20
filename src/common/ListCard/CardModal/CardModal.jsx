import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./CardModal.scss";
import Button from "common/UI/Button/Button";
const CardModal = ({
   onHover,
   children,
   defaultButton = true,
   oneButton = false,
   isFavourite,
   clicked,
   menuClicked,
   themeButton = false,
   playClicked,
}) => {
   // console.log(isFavourite);
   const nodeRef = useRef(null);
   return (
      <CSSTransition
         nodeRef={nodeRef}
         in={onHover}
         timeout={100}
         unmountOnExit
         mountOnEnter
         classNames="card-modal--hover">
         <div ref={nodeRef} className="card-modal">
            <div className="card-modal__backdrop"></div>
            <div
               className={`card-modal__control ${
                  themeButton ? "card-theme__control" : ""
               } `}>
               {defaultButton && !oneButton && !themeButton && (
                  <>
                     <Button
                        icon={"ic-like"}
                        custom={`button--card button--heart ${
                           isFavourite ? "active" : ""
                        }`}
                        hover
                        clicked={clicked}>
                        <i className="icon ic-like-full"></i>
                     </Button>
                     <Button
                        icon="action-play ic-svg-play-circle"
                        custom="button--card"
                        hover
                        clicked={playClicked}
                     />
                     <Button
                        icon="ic-more"
                        custom="button--card"
                        hover
                        clicked={menuClicked}
                     />
                  </>
               )}
               {oneButton && (
                  <Button
                     icon="action-play ic-svg-play-circle"
                     custom="button--card button--middle"
                     hover
                  />
               )}
               {themeButton && (
                  <>
                     <Button text custom={"button--normal button-primary"}>
                        Áp dụng
                     </Button>
                     <Button text custom={"button--normal"}>
                        Xem trước
                     </Button>
                  </>
               )}
               {children}
            </div>
         </div>
      </CSSTransition>
   );
};

export default CardModal;
