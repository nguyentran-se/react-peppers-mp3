import authorApi from "api/authorApi";
import camelize from "camelize";
import { PEPPERS } from "constant/localStorage";
import { setLocalStorage } from "helper";
import PublicLayout from "hoc/PublicLayout/PublicLayout";
import PublicRoute from "hoc/PublicRoute/PublicRoute";
import React, { useEffect } from "react";
import { Switch } from "react-router";
import routes from "routes/routes";
const App = () => {
   useEffect(() => {
      const requestAuthorization = async () => {
         try {
            const response = await authorApi.getAuthorization();
            console.log(response?.data.access_token);
            setLocalStorage(PEPPERS, camelize(response?.data));
         } catch (error) {
            console.log(error);
         }
      };
      requestAuthorization();
   }, []);

   return (
      <PublicLayout>
         <Switch>
            {routes.map(
               (route, index) =>
                  route.layout === "PublicLayout" && (
                     <PublicRoute {...route} key={index} />
                  )
            )}
         </Switch>
      </PublicLayout>
   );
};

export default App;
