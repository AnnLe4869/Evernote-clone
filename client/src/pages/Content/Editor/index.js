import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "6rem",
    boxShadow: "none",
  },
  editor: {
    height: "100vh",
    background: "green",
  },
  editorContent: {
    height: "100%",
    background: "blue",
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

  const handleChange = (value) => setText(value);

  return (
    <div>
      <Paper className={classes.header} square>
        Hello
      </Paper>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper className={classes.editor} onClick={handleFocusIn}>
          {focusStatus ? (
            <ReactQuill
              className={classes.editorContent}
              value={text}
              onChange={handleChange}
            />
          ) : (
            <Typography>{text}</Typography>
          )}
        </Paper>
      </ClickAwayListener>
    </div>
  );
}
