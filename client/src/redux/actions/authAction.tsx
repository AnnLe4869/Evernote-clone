import firebase from "firebase";
import { Dispatch } from "redux";
import { LOG_IN_WITH_GOOGLE } from "../constants/constants";
import { setLoadingStatus } from "./loadingAction";

export const logInWithGoogle = () => async (
  dispatch: Dispatch
): Promise<any> => {
  // Display the loading
  // dispatch(setLoadingStatus(true));
  // Handle the authentication
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await firebase.auth().signInWithPopup(provider);
    return {
      type: LOG_IN_WITH_GOOGLE,
    };
  } catch (err) {
    console.error(err);
  }
};
