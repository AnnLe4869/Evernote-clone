import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "firebase";

import Authentication from "./pages/Auth";
import MainContent from "./pages/Content";
import AuthContext from "./context/auth-context";

function App() {
  const [userEmail, setUserEmail] = useState(
    firebase.auth().currentUser ? firebase.auth().currentUser.email : null
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  const login = () => {
    try {
      setUserEmail(firebase.auth().currentUser.email);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          userEmail,
          login,
        }}
      >
        <Switch>
          <Route path="/auth">
            <Authentication />
          </Route>
          {/* Temporarily disable the protected route           */}
          {true ? (
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
