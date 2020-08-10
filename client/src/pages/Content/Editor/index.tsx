import React, { useEffect } from "react";

import EditorHeader from "./EditorHeader/EditorHeader";
import EditorContent from "./EditorContent/EditorContent";
import { useSelector } from "react-redux";
import { StoreType, NoteType } from "../../../redux/type/type";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Editor({ setExpandStatus }: Props) {
  const allNotes = useSelector((store: StoreType) => store.note.allNotes);
  const selectedNoteId = useSelector(
    (store: StoreType) => store.note.selectedNote
  );
  const displayedNote = allNotes.find((note) => note.id === selectedNoteId);
  useEffect(() => console.log(displayedNote));
  return (
    <div>
      {/* The header of the editor */}
      <EditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <EditorContent {...displayedNote} />
    </div>
  );
}
