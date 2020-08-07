import {
  GET_CURRENT_USER,
  LOG_IN_WITH_GOOGLE,
  SET_CURRENT_USER,
  GET_ALL_NOTES,
  ADD_NOTE,
} from "../constants/constants";
import { NoteType } from "../type/type";

const notes: Array<NoteType> = [];

export default function (initialState = notes, action: any) {
  switch (action.type) {
    case GET_ALL_NOTES:
      return [...initialState, ...action.notes];
    case ADD_NOTE:
      return [...initialState, action.note];
    default:
      return initialState;
  }
}
