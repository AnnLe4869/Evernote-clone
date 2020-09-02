import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "firebase";

import Authentication from "./pages/Auth";
import MainContent from "./pages/Content";
import { setCurrentUser } from "./redux/actions/userAction";
import { StoreType, UserType } from "./redux/type/globalType";



function App() {
  const userId = useSelector((store: StoreType) => store.user.id);
  const dispatch = useDispatch();
  // Fetch the current user and add listener for potential user change
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const { displayName, uid, photoURL } = user;
        dispatch(setCurrentUser({ displayName, id: uid, photoURL }));
      }
    });
  });

  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Authentication />
        </Route>
        {userId ? (
          <Route path="/main">
            <MainContent />
          </Route>
        ) : null}

        <Redirect to="/auth"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
