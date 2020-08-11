import React, { useEffect, useState } from "react";

import EditorHeader from "./EditorHeader/EditorHeader";
import EditorContent from "./EditorContent/EditorContent";
import { useSelector } from "react-redux";
import { StoreType, NoteType } from "../../../redux/type/type";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Editor({ setExpandStatus }: Props) {
  const selectedNote = useSelector(
    (store: StoreType) => store.note.selectedNote
  );

  // useEffect(() => {
  //   console.log("this is the selected note");
  //   console.log(selectedNote);
  // });

  return (
    <div>
      {/* The header of the editor */}
      <EditorHeader setExpandStatus={setExpandStatus} {...selectedNote} />
      {/* The actual editor part */}
      <EditorContent {...selectedNote} />
    </div>
  );
}
