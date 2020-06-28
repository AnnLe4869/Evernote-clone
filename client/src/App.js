import React, { useState } from "react";

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
  const [user, setUser] = useState(
    firebase.auth().currentUser ? firebase.auth().currentUser : null
  );
  const [isAuthenticated, setAuthenticated] = useState(
    firebase.auth().currentUser ? true : false
  );

  const login = () => {
    try {
      setAuthenticated(true);
      setUser(firebase.auth().currentUser);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Router>
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated,
          login,
        }}
      >
        <Switch>
          <Route path="/auth">
            <Authentication />
          </Route>

          {isAuthenticated ? (
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
