import { combineReducers } from "redux";
import authReducer from "./authReducer";
import favReducer from "./favReducer";
import playerReducer from "./playerReducer";
import userReducer from "./userReducer";
const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   fav: favReducer,
   player: playerReducer,
});
export default rootReducer;
