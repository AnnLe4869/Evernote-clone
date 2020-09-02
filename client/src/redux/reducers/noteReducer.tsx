import { GET_ALL_NOTES, ADD_NOTE, UPDATE_NOTE } from "../constants/constants";
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

    default:
      return initialState;
  }
}
