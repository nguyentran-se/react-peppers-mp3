import React from "react";
import routes from "routes/routes";
import PublicRoute from "hoc/PublicRoute/PublicRoute";
import { Switch } from "react-router";
const App = () => {
   return (
      <Switch>
         {routes.map((route, index) => (
            <PublicRoute {...route} key={index} />
         ))}
      </Switch>
   );
};

export default App;
