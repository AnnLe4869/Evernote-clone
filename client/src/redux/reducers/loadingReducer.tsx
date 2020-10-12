import {
  SET_NOTEBOOKS_LOADING_STATUS,
  SET_NOTES_LOADING_STATUS,
} from "../constants/constants";
import { loadingActionType } from "../type/actionType/loadingActionType";
import { LoadingType } from "../type/globalType";

const loadingStatus: LoadingType = {
  notebooksLoading: true,
  notesLoading: true,
};

export default function (
  initialState = loadingStatus,
  action: loadingActionType
) {
  switch (action.type) {
    case SET_NOTES_LOADING_STATUS:
      return {
        ...initialState,
        notesLoading: action.isLoading,
      };
    case SET_NOTEBOOKS_LOADING_STATUS:
      return {
        ...initialState,
        notebooksLoading: action.isLoading,
      };
    default:
      return initialState;
  }
}
