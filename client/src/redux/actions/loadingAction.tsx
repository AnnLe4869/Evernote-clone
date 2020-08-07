import { SET_LOADING_STATUS } from "../constants/constants";

interface LoadingActionType {
  type: string;
  isLoading: Boolean;
}

export const setLoadingStatus = (value: Boolean): LoadingActionType => ({
  type: SET_LOADING_STATUS,
  isLoading: value,
});
