import React from "react";

import EditorHeader from "./EditorHeader/EditorHeader";
import EditorContent from "./EditorContent/EditorContent";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}
export default function Editor({ setExpandStatus }: Props) {
  return (
    <div>
      {/* The header of the editor */}
      <EditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <EditorContent />
    </div>
  );
}
