import * as actionTypes from "../actions/actionTypes";

const initialState = {
   playlists: [],
   albums: [],
};

const favReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.FETCH_PLAYLISTS_SUCCESS:
         return {
            ...state,
            playlists: [...payload.playlists],
         };
      case actionTypes.FETCH_ALBUMS_SUCCESS:
         return {
            ...state,
            albums: [...payload.albums],
         };

      default:
         return state;
   }
};

export default favReducer;
