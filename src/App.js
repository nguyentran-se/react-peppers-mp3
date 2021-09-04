import authorizeApi from "api/authorizeApi";
import credentialApi from "api/credentialApi";
import userApi from "api/userApi";
import camelize from "camelize";
import { PEPPERS, USER } from "constant/localStorage";
import { getLocalStorage, setLocalStorage } from "helper";
import { useScrollTop } from "hooks";
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
import { requestGetTokenOnExpired } from "store/actions/authAction";

const App = () => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const history = useHistory();

   useScrollTop();

   /**
    * @implements client_crediential to get data when user not login
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

   /**
    * @implements call api refreshToken
    * @description check USER in localStore to get time expire.
    */
   useEffect(() => {
      let timeout;
      if (getLocalStorage(USER)) {
         const {
            accessToken: token,
            refreshToken,
            expiresIn: expiresInTime,
         } = getLocalStorage(USER);

         const now = new Date().getTime();

         if (now < expiresInTime && token) {
            dispatch(loginSuccess());
            console.log("EXPIRED");
            timeout = setTimeout(() => {
               dispatch(requestGetTokenOnExpired(refreshToken));
            }, expiresInTime - now);
         } else if (now >= expiresInTime) {
            dispatch(requestGetTokenOnExpired(refreshToken));
         }
      }

      return () => {
         clearTimeout(timeout);
      };
   }, [dispatch]);

   /**
    * @implements getUserData
    */
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
    * @implements check code response on URL
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
               refreshToken: data.refreshToken,
               expiresIn: new Date().getTime() + data.expiresIn * 1000,
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
