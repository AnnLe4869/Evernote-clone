import React from "react";
import { useHistory } from "react-router-dom";

import { Button, CssBaseline, Container } from "@material-ui/core";

import firebase from "firebase/app";
import "firebaseui";

export default function Auth() {
  const history = useHistory();

  const handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      //const token = result.credential.accessToken;
      const user = result.user;
      console.log(user);
      history.push("/main");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Sign in with Google
        </Button>
      </div>
    </Container>
  );
}
