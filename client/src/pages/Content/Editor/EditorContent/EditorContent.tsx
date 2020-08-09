import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";

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
  const [text, setText] = useState("hello");
  const [focusStatus, setFocusStatus] = useState(false);

  const handleClickAway = () => {
    if (focusStatus) setFocusStatus(false);
  };
  const handleFocusIn = () => {
    if (!focusStatus) setFocusStatus(true);
  };

  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper className={classes.editor} onClick={handleFocusIn}>
        {focusStatus ? (
          <ReactQuill
            className={classes.editorContentWrite}
            value={text}
            onChange={handleChange}
          />
        ) : (
          <ReactQuill
            className={classes.editorContentRead}
            value={text}
            readOnly
            theme="bubble"
          />
        )}
      </Paper>
    </ClickAwayListener>
  );
}
