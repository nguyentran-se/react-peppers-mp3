import * as actionTypes from "../actions/actionTypes";
const initialState = {
   paused: true,
   deviceId: null,
   status: null,
   currentTrack: null,
   player: null,
};

const playerReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.SET_PLAYER_STATUS:
         return { ...state, ...payload };
      case actionTypes.SET_CURRENT_TRACK:
         return { ...state, ...payload };
      case actionTypes.PAUSED:
         return { ...state, ...payload };
      default:
         return state;
   }
};
export default playerReducer;
