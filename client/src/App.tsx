import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase, { User } from "firebase";

import Authentication from "./pages/Auth";
import MainContent from "./pages/Content";
import { setCurrentUser } from "./redux/actions/userAction";

interface RootState {
  user: User;
}

function App() {
  const userId = useSelector((store: RootState) => store.user.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const { displayName, uid, photoURL } = user;
        dispatch(setCurrentUser({ displayName, uid, photoURL }));
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
