import React from "react";

import EditorHeader from "./EditorHeader/EditorHeader";
import EditorContent from "./EditorContent/EditorContent";

export default function Editor({ setExpandStatus }) {
  return (
    <div>
      {/* The header of the editor */}
      <EditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <EditorContent />
    </div>
  );
}
