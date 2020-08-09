import { combineReducers } from "redux";
import authReducer from "./authReducer";
import noteReducer from "./noteReducer";

export const rootReducer = combineReducers({
  user: authReducer,
  note: noteReducer,
});
