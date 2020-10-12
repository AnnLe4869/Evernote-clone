import firebase, { User } from "firebase";
import { Dispatch } from "redux";
import { LOG_IN_WITH_GOOGLE } from "../constants/constants";

export const logInWithGoogle = () => async (
  dispatch: Dispatch
): Promise<void> => {
  //Display the loading
  //dispatch(setLoadingStatus(true));
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
