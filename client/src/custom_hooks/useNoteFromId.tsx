import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ParamType, StoreType } from "../redux/type/globalType";

export default function useNoteFromId() {
  const { noteId } = useParams<ParamType>();
  const allNotes = useSelector((store: StoreType) => store.notes);

  if (!allNotes.find((note) => note.id === noteId)) {
    throw new Error(
      "Cannot find the note. Maybe the hook is used in wrong place"
    );
  }

  return allNotes.find((note) => note.id === noteId);
}
