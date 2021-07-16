import React, { Suspense } from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(props) => (
            <Layout>
               <Suspense fallback={<div>loading ...</div>}>
                  <Component {...props} />
               </Suspense>
            </Layout>
         )}
      />
   );
};

export default PublicRoute;
