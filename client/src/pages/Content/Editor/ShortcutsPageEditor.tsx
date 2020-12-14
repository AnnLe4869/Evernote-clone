import React from "react";
import EditorContent from "./EditorContent/EditorContent";
import ShortcutsPageEditorHeader from "./EditorHeader/ShortcutsPageEditorHeader";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ShortcutsPageEditor({ setExpandStatus }: Props) {
  return (
    <div>
      {/* The header of the editor */}
      <ShortcutsPageEditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <EditorContent />
    </div>
  );
}
