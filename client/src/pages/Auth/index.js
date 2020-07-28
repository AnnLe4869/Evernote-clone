import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
//import firebase from "firebase";

import AuthContext from "../../context/auth-context";

export default function Auth() {
  const { userEmail, login } = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();

  const handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      if (!userEmail) login();
      history.push("/main");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    //firebase.auth().signOut();
    if (userEmail) {
      history.push("/main");
    }
  }, [userEmail, history]);

  return (
    <div>
      <Switch>
        <Route path={`${match.url}/login`}>
          <LogIn signIn={handleClick}></LogIn>
        </Route>
        <Route path={`${match.url}/signup`}>
          <SignUp></SignUp>
        </Route>
        <Redirect to={`${match.url}/login`}></Redirect>
      </Switch>
    </div>
  );
}
