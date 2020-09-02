import {
  ADD_NOTE,
  GET_ALL_NOTES,
  UPDATE_NOTE,
} from "../../constants/constants";
import { NoteType } from "../globalType";

interface fetchAllNotesAction {
  type: typeof GET_ALL_NOTES;
  allNotes: NoteType[];
}

interface addNewNoteAction {
  type: typeof ADD_NOTE;
  addedNote: NoteType;
}

interface updateNoteAction {
  type: typeof UPDATE_NOTE;
  updatedNote: NoteType;
}

export type noteActionTypes =
  | fetchAllNotesAction
  | addNewNoteAction
  | updateNoteAction;
