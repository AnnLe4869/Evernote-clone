import { GET_ALL_NOTES, ADD_NOTE } from "../constants/constants";
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
      console.log("Hello world");
      console.log(action.allNotes);
      return {
        allNotes: [...initialState.allNotes, ...action.allNotes],
        selectedNote: initialState.selectedNote,
      };
    case ADD_NOTE:
      return {
        allNotes: [...initialState.allNotes, action.note],
        selectedNote: initialState.selectedNote,
      };
    default:
      return initialState;
  }
}
