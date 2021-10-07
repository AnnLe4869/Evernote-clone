import {
  GET_CURRENT_USER,
  LOG_IN_WITH_GOOGLE,
  LOG_OUT,
  SET_CURRENT_USER,
  LOG_IN_WITH_GITHUB,
  LOG_IN_WITH_TWITTER,
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

interface logInWithOAuth {
  type:
    | typeof LOG_IN_WITH_GOOGLE
    | typeof LOG_IN_WITH_TWITTER
    | typeof LOG_IN_WITH_GITHUB;
}

interface logOutAction {
  type: typeof LOG_OUT;
}

export type authActionTypes =
  | getCurrentUserAction
  | setCurrentUserAction
  | logInWithOAuth
  | logOutAction;
