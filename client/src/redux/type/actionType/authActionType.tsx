import {
  GET_CURRENT_USER,
  LOG_IN_WITH_GOOGLE,
  SET_CURRENT_USER,
} from "../../constants/constants";
import { UserType } from "../globalType";

interface getCurrentUserAction {
  type: typeof GET_CURRENT_USER;
  user: UserType;
}

interface setCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  user: UserType;
}

interface logInWithGoogleAction {
  type: typeof LOG_IN_WITH_GOOGLE;
}

export type authActionTypes =
  | getCurrentUserAction
  | setCurrentUserAction
  | logInWithGoogleAction;