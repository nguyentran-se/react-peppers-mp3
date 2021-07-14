import React from "react";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Header from "common/Header/Header";
import "./PublicLayout.scss";
const PublicLayout = (props) => {
   return (
      <div className="layout">
         <div className="layout__left">
            <Sidebar />
         </div>
         <div className="layout__right">
            <Header />
            <main>{props.children}</main>
         </div>
      </div>
   );
};

export default PublicLayout;
