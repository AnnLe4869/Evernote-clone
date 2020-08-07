import { SET_LOADING_STATUS } from "../constants/constants";

const loadingStatus = {
  isLoading: false,
};

export default function (initialState = loadingStatus, action: any) {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...initialState,
        ...action.isLoading,
      };
    default:
      return initialState;
  }
}
