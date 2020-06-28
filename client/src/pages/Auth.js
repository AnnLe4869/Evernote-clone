import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

import { Button, CssBaseline, Container } from "@material-ui/core";

//import firebase from "firebase";

import AuthContext from "../context/auth-context";

export default function Auth() {
  const [count, setCount] = useState(0);
  const { userId, login } = useContext(AuthContext);
  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleClick = async () => {
    try {
      await firebase.auth().signInWithPopup(provider);
      if (!userId) login();
      history.push("/main");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      history.push("/main");
    }
  }, [userId, history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Sign in with Google
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </Button>
        <div>{userId ? firebase.auth().currentUser.email : null}</div>
      </div>
    </Container>
  );
}
