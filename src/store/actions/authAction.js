import authorizeApi from "api/authorizeApi";
import camelize from "camelize";
import { USER } from "constant";
import { setLocalStorage } from "helper";
import * as actionTypes from "./actionTypes";

export const loginFail = (error) => ({
   type: actionTypes.LOGIN_FAIL,
   payload: { error },
});

export const loginSuccess = () => ({
   type: actionTypes.LOGIN_SUCCESS,
});

export const requestGetTokenOnExpired = (refreshToken) => {
   return async (dispatch) => {
      let { data } = await authorizeApi.getTokenOnExpired(refreshToken);
      data = camelize(data);
      console.log(data);
      setLocalStorage(USER, {
         accessToken: data.accessToken,
         refreshToken,
         expiresIn: new Date().getTime() + data.expiresIn * 1000,
      });
      dispatch(loginSuccess());
   };
};
