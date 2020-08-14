import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { NoteType } from "../../../../redux/type/type";
import { useDispatch } from "react-redux";
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

export default function Editor(props: NoteType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { content } = props;

  const [editorText, setEditorText] = useState("");
  const [focusStatus, setFocusStatus] = useState(false);
  // This refer to the note we previously working/display with before we click other note
  // This is needed because we need to know which item we work before so that we can update accordingly
  // Remember, when click away we re-render this component and the props is changed
  const [currentNote, setCurrentNote] = useState({
    id: "",
    creator: "",
    timestamp: "",
    content: "",
    title: "",
    shareWith: [{ user: "", canWrite: false }],
    inShortcut: false,
    inTrash: false,
  });

  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    if (content) {
      setEditorText(content);
      setCurrentNote(props);
    }
  }, [content]);

  const handleClickAway = () => {
    if (focusStatus) setFocusStatus(false);
    // Check if the content of the item is different from the content in the editor
    if (currentNote.content !== editorText) {
      console.log("hello world");
      dispatch(updateNote({ ...currentNote, content: editorText }));
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
