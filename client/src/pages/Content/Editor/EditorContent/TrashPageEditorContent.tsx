import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import useNoteFromPath from "../../../../utils/useNoteFromPath";

const useStyles = makeStyles(() => ({
  editor: {
    height: "100vh",
    background: "green",
  },
  editorContentWrite: {
    height: "100%",
    background: "blue",
  },
  editorContentRead: {
    height: "100%",
  },
}));

// For trash page because we doesn't allow any editing
export default function TrashPageEditorContent() {
  const classes = useStyles();

  const { note: selectedNote } = useNoteFromPath();

  const [editorText, setEditorText] = useState<string>("");

  // We assign the value of the note to editor
  // We need to do some checking
  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    if (selectedNote) {
      setEditorText(selectedNote.content);
    }
  }, [selectedNote]);

  return (
    <Paper className={classes.editor}>
      <ReactQuill
        className={classes.editorContentRead}
        value={editorText}
        readOnly
        theme="bubble"
      />
    </Paper>
  );
}
