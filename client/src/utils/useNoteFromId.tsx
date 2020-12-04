import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ParamType, StoreType } from "../redux/type/globalType";

// Find the note from the noteId fetched from URL
export default function useNoteFromId() {
  const { noteId } = useParams<ParamType>();
  const allNotes = useSelector((store: StoreType) => store.notes);

  if (!allNotes.find((note) => note.id === noteId)) {
    throw new Error(
      "Cannot find the note. Maybe the hook is used in wrong place"
    );
  }

  return { note: allNotes.find((note) => note.id === noteId), allNotes };
}
