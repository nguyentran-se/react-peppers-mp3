import authorizeApi from "api/authorizeApi";
import credentialApi from "api/credentialApi";
import userApi from "api/userApi";
import camelize from "camelize";
import { PEPPERS, USER } from "constant/localStorage";
import { getLocalStorage, setLocalStorage } from "helper";
import PublicLayout from "layout/PublicLayout/PublicLayout";
import PublicRoute from "layout/PublicRoute/PublicRoute";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router";
import { useHistory } from "react-router-dom";
import routes from "routes/routes";
import { selectIsLoggedIn } from "selectors";
import {
   loginFail,
   loginSuccess,
   requestUserDataFail,
   requestUserDataSuccess,
} from "store/actions";

const App = () => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const history = useHistory();

   /**
    * @description client_crediential to get data when user not login
    */
   useEffect(() => {
      const requestGetClientCredential = async () => {
         try {
            const response = await credentialApi.getClientCredential();
            // console.log(response?.data.access_token);
            setLocalStorage(PEPPERS, camelize(response?.data));
         } catch (error) {
            console.log(error);
         }
      };
      requestGetClientCredential();
   }, []);

   useEffect(() => {
      const token = getLocalStorage(USER)?.accessToken;
      if (token) dispatch(loginSuccess());
   }, [dispatch]);

   // - Call get currentUser after user login
   useEffect(() => {
      const requestGetUserData = async () => {
         try {
            const userData = await userApi.getCurrentUser();
            const { displayName, followers, id, images } = userData;
            dispatch(
               requestUserDataSuccess({
                  id,
                  displayName,
                  followers: followers.total,
                  image: images[0].url,
               })
            );
            // console.log(userData);
         } catch (error) {
            requestUserDataFail({ error: error.message });
         }
      };
      if (isLoggedIn) {
         requestGetUserData();
      }
   }, [dispatch, isLoggedIn]);

   /**
    * @description check token after history.location.search change
    *  - If not token then login = false, then check params response from spotify
    *    when click to my-music page. code: success || error: fail
    */
   useEffect(() => {
      const requestGetAuthorize = async () => {
         const params = queryString.parse(history.location.search);
         if (params?.error) {
            dispatch(loginFail(params.error));
         } else if (params?.code) {
            // get authorize when has code from params response
            const code = params.code;
            let { data } = await authorizeApi.getAuthorize(code);
            data = camelize(data);
            dispatch(loginSuccess());
            setLocalStorage(USER, {
               accessToken: data.accessToken,
               expiresIn: data.expiresIn,
               refreshToken: data.refreshToken,
            });
         }
      };
      const token = getLocalStorage(USER)?.accessToken;
      if (!token) {
         requestGetAuthorize();
      }
   }, [dispatch, history.location.search]);

   // console.log(getLocalStorage(USER)?.accessToken);

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
