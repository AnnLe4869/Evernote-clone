import React from "react";
import EditorContent from "./EditorContent/EditorContent";
import EditorHeader from "./EditorHeader/EditorHeader";

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Editor({ setExpandStatus }: Props) {
  // useEffect(() => {
  //   console.log("Parent editor re-mount");
  //   return () => {
  //     console.log("Parent of editor un-mount");
  //   };
  // }, []);

  return (
    <div>
      {/* The header of the editor */}
      <EditorHeader setExpandStatus={setExpandStatus} />
      {/* The actual editor part */}
      <EditorContent />
    </div>
  );
}
