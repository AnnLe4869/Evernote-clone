import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./redux/store/store";
import App from "./App";
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";

const store = configureStore();
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
