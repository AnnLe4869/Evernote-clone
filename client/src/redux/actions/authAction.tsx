import firebase from "firebase";
import { Dispatch } from "redux";
import {
  LOG_IN_WITH_GITHUB,
  LOG_IN_WITH_GOOGLE,
  LOG_IN_WITH_TWITTER,
} from "../constants/constants";

export const logInWithGoogle = () => async (
  dispatch: Dispatch
): Promise<void> => {
  // Handle the authentication
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const db = firebase.firestore();
    await db.collection("users").add({
      displayName: result.user?.displayName,
      id: result.user?.uid,
      photoURL: result.user?.photoURL,
    });
    dispatch({
      type: LOG_IN_WITH_GOOGLE,
    });
  } catch (err) {
    console.error(err);
  }
};

export const logInWithTwitter = () => async (
  dispatch: Dispatch
): Promise<void> => {
  // Handle the authentication
  const provider = new firebase.auth.TwitterAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const db = firebase.firestore();
    await db.collection("users").add({
      displayName: result.user?.displayName,
      id: result.user?.uid,
      photoURL: result.user?.photoURL,
    });
    dispatch({
      type: LOG_IN_WITH_TWITTER,
    });
  } catch (err) {
    console.error(err);
  }
};

export const logInWithGithub = () => async (
  dispatch: Dispatch
): Promise<void> => {
  // Handle the authentication
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const db = firebase.firestore();
    await db.collection("users").add({
      displayName: result.user?.displayName,
      id: result.user?.uid,
      photoURL: result.user?.photoURL,
    });
    dispatch({
      type: LOG_IN_WITH_GITHUB,
    });
  } catch (err) {
    console.error(err);
  }
};

export const logOut = () => async () => {
  try {
    await firebase.auth().signOut();
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};
