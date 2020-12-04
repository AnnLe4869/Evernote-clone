import { useSelector } from "react-redux";
import { StoreType } from "../redux/type/globalType";
import useNoteFromId from "./useNoteFromId";

// We find the notebook that the current selected note is in
export default function useNotebookFromNote() {
  const allNotebooks = useSelector((store: StoreType) => store.notebooks);
  const { note: currentNote } = useNoteFromId();

  if (!currentNote) {
    throw new Error("Something went wrong. No note is selected");
  }

  const notebook = allNotebooks.find((item) =>
    item.notes.includes(currentNote.id)
  );

  if (!notebook) {
    throw new Error("The selected note is not in any existing notebook");
  }

  return { notebook };
}
