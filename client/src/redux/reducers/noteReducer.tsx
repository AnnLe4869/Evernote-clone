import {
  GET_ALL_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  DELETE_MULTIPLE_NOTES,
} from "../constants/constants";
import { noteActionTypes } from "../type/actionType/noteActionType";
import { NoteType } from "../type/globalType";

const note: NoteType[] = [];

export default function (
  initialState = note,
  action: noteActionTypes
): NoteType[] {
  switch (action.type) {
    case GET_ALL_NOTES:
      return [...initialState, ...action.allNotes];

    case ADD_NOTE:
      return [action.addedNote, ...initialState];

    case UPDATE_NOTE:
      const allNotesUpdated = initialState.filter(
        (note) => note.id !== action.updatedNote.id
      );
      return [action.updatedNote, ...allNotesUpdated];

    case DELETE_NOTE:
      const leftNotes = initialState.filter(
        (note) => note.id !== action.deletedNote.id
      );
      return leftNotes;

    case DELETE_MULTIPLE_NOTES:
      // Remove all notes that is in the list of removed
      const remainNotes = initialState.filter(
        (note) => !action.deletedNotes.includes(note.id)
      );
      return remainNotes;

    default:
      return initialState;
  }
}
