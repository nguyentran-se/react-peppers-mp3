import React from "react";
import Sidebar from "../../common/Navigation/Sidebar/Sidebar";
const PublicLayout = (props) => {
   return (
      <>
         <Sidebar />
         <main>{props.children}</main>
      </>
   );
};

export default PublicLayout;
