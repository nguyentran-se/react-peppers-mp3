import React from "react";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Header from "common/Header/Header";
// import { Suspense } from "react";
import "./PublicLayout.scss";
const PublicLayout = (props) => {
   return (
      <div className="layout">
         <div className="layout-left">
            <Sidebar />
         </div>
         <div className="layout-right">
            <Header />
            <main>{props.children}</main>
         </div>
      </div>
   );
};

export default PublicLayout;
