import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/firestore";

import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "evernote-e077e.firebaseapp.com",
  databaseURL: "https://evernote-e077e.firebaseio.com",
  projectId: "evernote-e077e",
  storageBucket: "evernote-e077e.appspot.com",
  messagingSenderId: "333330020976",
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
