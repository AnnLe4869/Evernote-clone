import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

import { Button, CssBaseline, Container } from "@material-ui/core";

//import firebase from "firebase";

import AuthContext from "../context/auth-context";

export default function Auth() {
  const { user, isAuthenticated, login } = useContext(AuthContext);
  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleClick = async () => {
    try {
      await firebase.auth().signInWithPopup(provider);
      if (!isAuthenticated) login();
      history.push("/main");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(isAuthenticated);
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Sign in with Google
        </Button>
        <div>{user ? user.email : null}</div>
      </div>
    </Container>
  );
}
