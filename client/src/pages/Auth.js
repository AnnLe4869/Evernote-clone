import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Button, CssBaseline, Container } from "@material-ui/core";

import firebase from "firebase";

import AuthContext from "../context/auth-context";

export default function Auth() {
  const history = useHistory();
  const { user, login } = useContext(AuthContext);

  const handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      //const token = result.credential.accessToken;
      const user = result.user;
      //console.log(result);
      await firebase.firestore().collection("users").doc(user.uid).set({
        name: "San Francisco",
        state: "CA",
        country: "USA",
      });
      const userRef = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid);
      login();
      const doc = await userRef.get();
      const users = doc.data();

      console.log(users);
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
