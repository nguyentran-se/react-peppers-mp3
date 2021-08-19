import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./Queue.scss";
import QueueHeader from "./QueueHeader/QueueHeader";
import QueueList from "./QueueList/QueueList";
const Queue = ({ toggleQueue }) => {
   const nodeRef = useRef(null);
   return (
      <CSSTransition
         nodeRef={nodeRef}
         timeout={400}
         in={toggleQueue}
         mountOnEnter
         unmountOnExit
         classNames="queue">
         <div className="queue" ref={nodeRef}>
            <QueueHeader />
            <QueueList />
         </div>
      </CSSTransition>
   );
};

export default Queue;