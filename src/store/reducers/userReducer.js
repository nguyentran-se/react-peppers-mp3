import * as actionTypes from "store/actions/actionTypes";
const initialState = {
   id: null,
   displayName: null,
   followers: null,
   image: null,
   error: null,
};

const actionReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.REQUEST_USER_DATA_SUCCESS:
         return { ...state, ...payload.user };
      case actionTypes.REQUEST_USER_DATA_FAIL:
         return { ...state, error: payload.error };
      default:
         return state;
   }
};

export default actionReducer;
