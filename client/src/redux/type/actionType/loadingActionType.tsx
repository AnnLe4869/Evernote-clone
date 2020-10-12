import {
  SET_NOTEBOOKS_LOADING_STATUS,
  SET_NOTES_LOADING_STATUS,
} from "../../constants/constants";

interface setNotesLoadingAction {
  type: typeof SET_NOTES_LOADING_STATUS;
  isLoading: boolean;
}

interface setNotebooksLoadingAction {
  type: typeof SET_NOTEBOOKS_LOADING_STATUS;
  isLoading: boolean;
}

export type loadingActionType =
  | setNotesLoadingAction
  | setNotebooksLoadingAction;
