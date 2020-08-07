import {
  GET_CURRENT_USER,
  LOG_IN_WITH_GOOGLE,
  SET_CURRENT_USER,
} from "../constants/constants";

const user = {
  id: "",
  name: "",
  avatarUrl: "",
};

export default function (initialState = user, action: any) {
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
      return initialState;
    default:
      return initialState;
  }
}
