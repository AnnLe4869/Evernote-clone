import {
  ADD_NOTE,
  DELETE_MULTIPLE_NOTES,
  DELETE_NOTE,
  GET_ALL_NOTES,
  UPDATE_MULTIPLE_NOTES,
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

interface updateMultipleNotesAction {
  type: typeof UPDATE_MULTIPLE_NOTES;
  updatedNotes: NoteType[];
}

interface permanentDeleteNoteAction {
  type: typeof DELETE_NOTE;
  deletedNote: NoteType;
}

interface permanentDeleteMultipleNoteAction {
  type: typeof DELETE_MULTIPLE_NOTES;
  deletedNotes: string[];
}

export type noteActionTypes =
  | fetchAllNotesAction
  | addNewNoteAction
  | updateNoteAction
  | updateMultipleNotesAction
  | permanentDeleteNoteAction
  | permanentDeleteMultipleNoteAction;
