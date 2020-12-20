import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { updateNoteContent } from "../../../../redux/actions/noteAction";
import { NoteType } from "../../../../redux/type/globalType";
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

export default function EditorContent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { note: selectedNote } = useNoteFromPath();

  const [editorText, setEditorText] = useState<string>("");
  const [focusStatus, setFocusStatus] = useState(false);

  const [note, setNote] = useState<NoteType>();

  // We assign the value of the note to editor
  // We need to do some checking
  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    if (selectedNote) {
      setEditorText(selectedNote.content);
      setNote(selectedNote);
    }
  }, [selectedNote]);

  // Handle when user click away from the editor
  // For now this only apply for non-route-link element
  const handleClickAway = () => {
    // Check if the content of the item is different from the content in the editor
    if (focusStatus) setFocusStatus(false);
    if (note && note.content !== editorText) {
      dispatch(updateNoteContent(editorText, note));
    }
  };

  const handleFocusIn = () => {
    if (!focusStatus) setFocusStatus(true);
  };

  const handleChange = (content: string) => {
    setEditorText(content);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper className={classes.editor} onClick={handleFocusIn}>
        {focusStatus ? (
          <ReactQuill
            className={classes.editorContentWrite}
            value={editorText}
            onChange={handleChange}
          />
        ) : (
          <ReactQuill
            className={classes.editorContentRead}
            value={editorText}
            readOnly
            theme="bubble"
          />
        )}
      </Paper>
    </ClickAwayListener>
  );
}
