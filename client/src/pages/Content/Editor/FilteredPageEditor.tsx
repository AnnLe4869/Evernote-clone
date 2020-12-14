import React from "react";
import EditorContent from "./EditorContent/EditorContent";
import FilteredPageEditorHeader from "./EditorHeader/FilteredPageEditorHeader";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function FilteredPageEditor({ setExpandStatus }: Props) {
  return (
    <div>
      {/* The header of the editor */}
      <FilteredPageEditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <EditorContent />
    </div>
  );
}
