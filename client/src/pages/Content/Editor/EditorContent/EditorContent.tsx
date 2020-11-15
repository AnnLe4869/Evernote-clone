import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import {
  NoteType,
  ParamType,
  StoreType,
} from "../../../../redux/type/globalType";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../../../../redux/actions/noteAction";
import { useParams } from "react-router-dom";

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

  const { noteId } = useParams<ParamType>();
  const allNotes = useSelector((store: StoreType) => store.notes);
  const selectedNote = useMemo(() => {
    return allNotes.find((note) => note.id === noteId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, allNotes]);

  const [editorText, setEditorText] = useState<string>("");
  const [focusStatus, setFocusStatus] = useState(false);
  const editorRef = useRef<string>("");

  // We assign the value of the note to editor
  // We need to do some checking
  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    console.log("%cCheckpoint 1", "color: blue");
    if (selectedNote) {
      setEditorText(selectedNote.content);
      editorRef.current = selectedNote.content;
    }
  }, [selectedNote]);

  // Handle when user click away from the editor
  // For now this only apply for non-route-link element
  const handleClickAway = () => {
    console.log("%cCheckpoint 2", "color: yellow");
    if (focusStatus) setFocusStatus(false);
    // Check if the content of the item is different from the content in the editor
    if (selectedNote && selectedNote?.content !== editorText) {
      dispatch(updateNote({ ...selectedNote, content: editorText }));
    }
  };

  // Fire when user click on link to other route
  useEffect(() => {
    return () => {
      console.log("%cCheckpoint 3", "color: green");
      console.log("%cEditor content: " + editorRef.current, "color: red");
      console.log(
        "%cNote current content: " + selectedNote?.content,
        "color: red"
      );

      // Check if the content of the item is different from the content in the editor
      if (selectedNote && selectedNote?.content !== editorRef.current) {
        console.log("%cCheckpoint 3 inside", "color: green");
        console.log("Note content " + selectedNote?.content);
        console.log("Editor content " + editorRef.current);
        dispatch(updateNote({ ...selectedNote, content: editorRef.current }));
      }
    };
  }, []);

  const handleFocusIn = () => {
    if (!focusStatus) setFocusStatus(true);
  };

  const handleChange = (content: string) => {
    setEditorText(content);
    editorRef.current = content;
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
