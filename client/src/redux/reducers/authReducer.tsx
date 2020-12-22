import {
  GET_CURRENT_USER,
  LOG_IN_WITH_GITHUB,
  LOG_IN_WITH_GOOGLE,
  LOG_IN_WITH_TWITTER,
  LOG_OUT,
  SET_CURRENT_USER,
} from "../constants/constants";
import { authActionTypes } from "../type/actionType/authActionType";
import { UserType } from "../type/globalType";

const user: UserType = {
  id: "",
  displayName: "",
  photoURL: "",
};

export default function (
  initialState = user,
  action: authActionTypes
): UserType {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...initialState,
        ...action.user,
      };

    case SET_CURRENT_USER:
      return {
        ...initialState,
        ...action.user,
      };

    case LOG_IN_WITH_GOOGLE:
    case LOG_IN_WITH_TWITTER:
    case LOG_IN_WITH_GITHUB:
      return initialState;

    case LOG_OUT:
      return {
        id: "",
        displayName: "",
        photoURL: "",
      };
    default:
      return initialState;
  }
}
