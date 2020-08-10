import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { NoteType } from "../../../../redux/type/type";

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
  const { title, creator, content, timestamp } = props;

  const [text, setText] = useState("");
  const [focusStatus, setFocusStatus] = useState(false);

  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    if (content) {
      setText(content);
    }
  }, [content]);

  const handleClickAway = () => {
    if (focusStatus) setFocusStatus(false);
  };
  const handleFocusIn = () => {
    if (!focusStatus) setFocusStatus(true);
  };

  const handleChange = (content: string) => {
    setText(content);
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
