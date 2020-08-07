import firebase from "firebase";

import { SET_CURRENT_USER, GET_CURRENT_USER } from "../constants/constants";
import { UserType } from "../type/type";

export const setCurrentUser = (user: UserType) => {
  return {
    type: SET_CURRENT_USER,
    user: user,
  };
};

export const getCurrentUser = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const { displayName, uid, photoURL } = user;
    return {
      type: GET_CURRENT_USER,
      user: { displayName, id: uid, photoURL },
    };
  }
  return {
    type: GET_CURRENT_USER,
    user: null,
  };
};
