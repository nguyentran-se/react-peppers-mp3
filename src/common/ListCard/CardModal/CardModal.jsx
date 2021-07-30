import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./CardModal.scss";
import Button from "common/UI/Button/Button";
const CardModal = ({ onHover }) => {
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
               <Button icon="ic-like" />
               <Button icon="action-play ic-svg-play-circle" />
               <Button icon="ic-more" />
            </div>
         </div>
      </CSSTransition>
   );
};

export default CardModal;
