import React from "react";
import EditorContent from "./EditorContent/EditorContent";
import AllPageEditorHeader from "./EditorHeader/AllPageEditorHeader";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function AllPageEditor({ setExpandStatus }: Props) {
  return (
    <div>
      {/* The header of the editor */}
      <AllPageEditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <EditorContent />
    </div>
  );
}
