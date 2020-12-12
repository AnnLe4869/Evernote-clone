import {
  ADD_NOTEBOOK,
  DELETE_NOTEBOOK,
  GET_ALL_NOTEBOOKS,
  UPDATE_NOTEBOOK,
} from "../../constants/constants";
import { NotebookType } from "../globalType";

interface fetchALlNotebooksAction {
  type: typeof GET_ALL_NOTEBOOKS;
  allNotebooks: NotebookType[];
}
interface addNewNotebookAction {
  type: typeof ADD_NOTEBOOK;
  addedNotebook: NotebookType;
}
interface updateNotebookAction {
  type: typeof UPDATE_NOTEBOOK;
  updatedNotebook: NotebookType;
}

interface deleteNotebookAction {
  type: typeof DELETE_NOTEBOOK;
  deletedNotebook: NotebookType;
}

export type notebookActionTypes =
  | fetchALlNotebooksAction
  | addNewNotebookAction
  | updateNotebookAction
  | deleteNotebookAction;
