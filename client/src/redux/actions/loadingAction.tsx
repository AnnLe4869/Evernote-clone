import {
  SET_NOTEBOOKS_LOADING_STATUS,
  SET_NOTES_LOADING_STATUS,
} from "../constants/constants";

export const setNotesLoadingStatus = (value: boolean) => ({
  type: SET_NOTES_LOADING_STATUS,
  isLoading: value,
});

export const setNotebookLoadingStatus = (value: boolean) => ({
  type: SET_NOTEBOOKS_LOADING_STATUS,
  isLoading: value,
});
