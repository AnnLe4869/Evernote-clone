import React from "react";
import TrashPageEditorContent from "./EditorContent/TrashPageEditorContent";
import TrashPageEditorHeader from "./EditorHeader/TrashPageEditorHeader";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function TrashPageEditor({ setExpandStatus }: Props) {
  return (
    <div>
      {/* The header of the editor */}
      <TrashPageEditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <TrashPageEditorContent />
    </div>
  );
}
