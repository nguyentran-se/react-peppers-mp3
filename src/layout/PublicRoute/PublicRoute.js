import React, { Suspense } from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(props) => (
            <Suspense fallback={<div></div>}>
               <Component {...props} />
            </Suspense>
         )}
      />
   );
};

export default PublicRoute;
