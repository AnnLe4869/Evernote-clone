import {
  GET_ALL_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  SELECT_NOTE,
} from "../constants/constants";
import { NoteType } from "../type/type";

interface Note {
  allNotes: NoteType[];
  selectedNote: string;
}

const note: Note = {
  allNotes: [],
  selectedNote: "",
};

export default function (initialState = note, action: any) {
  switch (action.type) {
    case GET_ALL_NOTES:
      return {
        allNotes: [...initialState.allNotes, ...action.allNotes],
        selectedNote: action.allNotes[0],
      };
    case ADD_NOTE:
      return {
        allNotes: [action.addedNote, ...initialState.allNotes],
        selectedNote: action.addedNote,
      };
    case UPDATE_NOTE:
      const allNotesUpdated = initialState.allNotes.filter(
        (note) => note.id !== action.updatedNote.id
      );
      return {
        allNotes: [action.updatedNote, ...allNotesUpdated],
        selectedNote: initialState.selectedNote,
      };

    case SELECT_NOTE:
      return {
        allNotes: initialState.allNotes,
        selectedNote: action.selectedNote,
      };
    default:
      return initialState;
  }
}
