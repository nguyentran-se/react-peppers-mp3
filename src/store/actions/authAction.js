import * as actionTypes from "./actionTypes";

export const loginFail = (error) => ({
   type: actionTypes.LOGIN_FAIL,
   payload: { error },
});

export const loginSuccess = () => ({
   type: actionTypes.LOGIN_SUCCESS,
});
