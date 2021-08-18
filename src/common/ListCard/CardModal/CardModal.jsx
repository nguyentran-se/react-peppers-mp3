import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./CardModal.scss";
import Button from "common/UI/Button/Button";
const CardModal = ({
   onHover,
   children,
   defaultButton = true,
   oneButton = false,
}) => {
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
            <div className="card-modal__control">
               {defaultButton && !oneButton && (
                  <>
                     <Button icon="ic-like" custom="button--card" hover />
                     <Button
                        icon="action-play ic-svg-play-circle"
                        custom="button--card"
                        hover
                     />
                     <Button icon="ic-more" custom="button--card" hover />
                  </>
               )}
               {oneButton && (
                  <Button
                     icon="action-play ic-svg-play-circle"
                     custom="button--card button--middle"
                     hover
                  />
               )}
               {children}
            </div>
         </div>
      </CSSTransition>
   );
};

export default CardModal;
