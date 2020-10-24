import React, { useEffect, useState, useMemo } from "react";

import EditorHeader from "./EditorHeader/EditorHeader";
import EditorContent from "./EditorContent/EditorContent";
import { useSelector } from "react-redux";
import { StoreType, NoteType, ParamType } from "../../../redux/type/globalType";
import { useParams } from "react-router-dom";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Editor({ setExpandStatus }: Props) {
  const { noteId } = useParams<ParamType>();

  const allNotes = useSelector((store: StoreType) => store.notes);

  const selectedNote = useMemo(() => {
    return allNotes.find((note) => note.id === noteId);
  }, [noteId]);

  if (!selectedNote) return <div>Error</div>;

  return (
    <div>
      {/* The header of the editor */}
      <EditorHeader setExpandStatus={setExpandStatus} {...selectedNote} />
      {/* The actual editor part */}
      <EditorContent {...selectedNote} />
    </div>
  );
}
