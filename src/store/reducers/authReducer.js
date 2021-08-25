// import { USER } from "constant";
// import { getLocalStorage } from "helper";
import * as actionTypes from "store/actions/actionTypes";

const initialState = {
   isLoggedIn: false,
   error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.LOGIN_FAIL:
         return { ...state, error: payload.error };
      case actionTypes.LOGIN_SUCCESS:
         return { ...state, isLoggedIn: true, error: null };
      default:
         return state;
   }
};

export default authReducer;
