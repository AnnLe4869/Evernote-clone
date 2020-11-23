import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import useNoteFromId from "../../../../custom_hooks/useNoteFromId";
import { updateNote } from "../../../../redux/actions/noteAction";

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

export default function Editor() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedNote = useNoteFromId();

  const [editorText, setEditorText] = useState<string>("");
  const [focusStatus, setFocusStatus] = useState(false);

  // We assign the value of the note to editor
  // We need to do some checking
  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    console.log(
      "%cTitle is: " +
        selectedNote?.title +
        " ;with content: " +
        selectedNote?.content,
      "color: blue"
    );
    console.log("%c" + editorText, "color: blue");
    if (selectedNote) {
      setEditorText(selectedNote.content);
    }
  }, [selectedNote]);

  // Handle when user click away from the editor
  // For now this only apply for non-route-link element
  const handleClickAway = () => {
    console.log(
      "%cTitle is: " +
        selectedNote?.title +
        " ;with content: " +
        selectedNote?.content,
      "color: green"
    );
    console.log("%c" + editorText, "color: green");

    if (focusStatus) setFocusStatus(false);
    // Check if the content of the item is different from the content in the editor
    if (selectedNote && selectedNote?.content !== editorText) {
      dispatch(updateNote({ ...selectedNote, content: editorText }));
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
