import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import noteReducer from "../reducers/noteReducer";
import loadingReducer from "../reducers/loadingReducer";

const reducer = {
  note: noteReducer,
  user: authReducer,
  loading: loadingReducer,
};

export default configureStore({ reducer });
