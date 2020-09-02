import authReducer from "../reducers/authReducer";
import noteReducer from "../reducers/noteReducer";
import loadingReducer from "../reducers/loadingReducer";
import notebookReducer from "../reducers/notebookReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  note: noteReducer,
  notebook: notebookReducer,
  user: authReducer,
  loading: loadingReducer,
});

export default rootReducer;