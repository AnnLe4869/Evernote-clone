import React from "react";
import TrashPageEditorContent from "./EditorContent/TrashPageEditorContent";
import EditorHeader from "./EditorHeader/EditorHeader";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function TrashPageEditor({ setExpandStatus }: Props) {
  return (
    <div>
      {/* The header of the editor */}
      <EditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <TrashPageEditorContent />
    </div>
  );
}
