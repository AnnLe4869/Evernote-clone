import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "firebase";

import Authentication from "./pages/Auth";
import MainContent from "./pages/Main";
import AuthContext from "./context/auth-context";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(
    firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  const login = () => {
    try {
      setUserId(firebase.auth().currentUser.uid);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Router>
      <AuthContext.Provider
        value={{
          userId,
          login,
        }}
      >
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
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
