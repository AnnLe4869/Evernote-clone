import { NotebookType } from "../type/globalType";
import {
  GET_ALL_NOTEBOOKS,
  ADD_NOTEBOOK,
  UPDATE_NOTEBOOK,
} from "../constants/constants";
import { notebookActionTypes } from "../type/actionType/notebookActionType";

const notebook: NotebookType[] = [];

export default function (
  initialState = notebook,
  action: notebookActionTypes
): NotebookType[] {
  switch (action.type) {
    case GET_ALL_NOTEBOOKS:
      return [...initialState, ...action.allNotebooks];

    case ADD_NOTEBOOK:
      return [action.addedNotebook, ...initialState];
      
    case UPDATE_NOTEBOOK:
      const allNotebooksUpdated = initialState.filter(
        (notebook) => notebook.id !== action.updatedNotebook.id
      );
      return [action.updatedNotebook, ...allNotebooksUpdated];;;

    default:
      return initialState;
  }
}
