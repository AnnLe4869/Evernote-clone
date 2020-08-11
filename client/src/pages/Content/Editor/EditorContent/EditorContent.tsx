import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { NoteType } from "../../../../redux/type/type";
import { useDispatch } from "react-redux";
import {
  updateNote,
  setSelectedNote,
} from "../../../../redux/actions/noteAction";

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
  const { title, content } = props;

  const [text, setText] = useState("");
  const [focusStatus, setFocusStatus] = useState(false);

  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    if (content) {
      console.log("This is inside the useEffect of the editor " + Date.now());
      setText(content);
    }
  }, [content, focusStatus]);

  // useEffect(() => {
  //   return () => console.log("hello world");
  // });

  const handleClickAway = () => {
    if (focusStatus) setFocusStatus(false);
    console.log(props);
    console.log(text);
    if (content !== text) {
      console.log("This is in handleClickAway " + Date.now());
      dispatch(updateNote({ ...props, content: text }));
    }
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
