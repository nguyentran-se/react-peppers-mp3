import { combineReducers } from "redux";
import authReducer from "./authReducer";
import favReducer from "./favReducer";
import userReducer from "./userReducer";
const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   fav: favReducer,
});
export default rootReducer;
