import ListCategory from "common/ListCategory/ListCategory";
import { themes } from "constant";
import React from "react";
import "./Theme.scss";
import "../Modal.scss";

const Theme = () => {
   return (
      <div className="theme">
         <ListCategory listCategory={themes} wrapItems={true} />
      </div>
   );
};

export default Theme;
