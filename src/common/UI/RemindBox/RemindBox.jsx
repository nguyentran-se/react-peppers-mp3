import React from "react";
import Button from "../Button/Button";
import "./RemindBox.scss";
const RemindBox = ({ text }) => {
   return (
      <div className="remindbox">
         <div className="remindbox-wrapper">
            <p className="remindbox-text">
               Đăng nhập để khám phá những playlist dành riêng cho chính bạn.
            </p>
            <Button custom="button--normal" text>
               ĐĂNG NHẬP
            </Button>
         </div>
      </div>
   );
};

export default RemindBox;
