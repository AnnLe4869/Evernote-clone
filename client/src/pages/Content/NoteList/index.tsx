import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import ListHeader from "./ListHeader/ListHeader";
import ListContent from "./ListContent/ListContent";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NoteType, UserType } from "../../../redux/type/type";
import { getAllNotes } from "../../../redux/actions/noteAction";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  itemDisplay: {
    height: "calc(100vh - 8rem)",
    overflowY: "auto",
    boxSizing: "content-box",
    scrollbarColor: "transparent",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slate grey",
    },
  },
}));

interface RootState {
  note: {
    allNotes: NoteType[];
    selectedNote: string;
  };
  user: UserType;
}

export default function NoteList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  //const userId = useSelector((store: RootState) => store.user.id);

  const notes = useSelector((store: RootState) => store.note);

  useEffect(() => {
    dispatch(getAllNotes());
  }, [notes.selectedNote, dispatch]);

  return (
    <div>
      <List className={classes.root}>
        {/* This is the notebook title and utility button */}
        <ListHeader />
        {/* The below are all the notes within the notebook, brief detail */}
        <div className={classes.itemDisplay}>
          {/* Some special item have a star to show that they are in shortcut */}
          {notes.allNotes.map((note) => (
            <ListContent key={note.id} {...note} />
          ))}
        </div>
      </List>
    </div>
  );
}
