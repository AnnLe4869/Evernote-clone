import { configureStore, createStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import noteReducer from "../reducers/noteReducer";
import loadingReducer from "../reducers/loadingReducer";
import notebookReducer from "../reducers/notebookReducer";
import rootReducer from "../reducers";

const reducer = {
  note: noteReducer,
  notebook: notebookReducer,
  user: authReducer,
  loading: loadingReducer,
};

const store = createStore(rootReducer);

export default store;


