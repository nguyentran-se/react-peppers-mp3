import * as actionTypes from "./actionTypes";

export const requestUserDataSuccess = (user) => ({
   type: actionTypes.REQUEST_USER_DATA_SUCCESS,
   payload: { user },
});

export const requestUserDataFail = (error) => ({
   type: actionTypes.REQUEST_USER_DATA_FAIL,
   payload: { error },
});
