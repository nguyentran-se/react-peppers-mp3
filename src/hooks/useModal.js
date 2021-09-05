import Button from "common/UI/Button/Button";
import { useCallback, useRef } from "react";
import usePortal from "react-cool-portal";
/**
 * @description css in .peppers-modal.open{...yourchildren};
 */
const useModal = (options) => {
   const modalRef = useRef(null);
   const { Portal, isShow, hide, ...rest } = usePortal({
      ...options,
      defaultShow: false,
      containerId: "peppers-portal",
   });

   const Modal = useCallback(
      ({ children, heading }) => {
         return (
            <Portal>
               <div
                  ref={modalRef}
                  className={`peppers-modal ${isShow ? "open" : "close"}`}
                  onClick={(e) => e.target === modalRef.current && hide()}>
                  <div className="modal-box">
                     <div className="modal-header">
                        <h2>{heading}</h2>
                        <Button icon={"ic-close"} hoverNoShape clicked={hide} />
                     </div>
                     <div className="modal-content">{children}</div>
                  </div>
               </div>
            </Portal>
         );
      },
      [hide, isShow]
   );
   return { Modal, isShow, hide, ...rest };
};

export default useModal;
