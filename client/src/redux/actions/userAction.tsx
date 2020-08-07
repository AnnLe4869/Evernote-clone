import firebase, { User } from "firebase";

import { SET_CURRENT_USER, GET_CURRENT_USER } from "../constants/constants";

export const setCurrentUser = (user: User) => {
  return {
    type: SET_CURRENT_USER,
    user: user,
  };
};

export const getCurrentUser = () => {
  const user = firebase.auth().currentUser;
  if (user)
    return {
      type: GET_CURRENT_USER,
      user,
    };
  return {
    type: GET_CURRENT_USER,
    user: null,
  };
};
