import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/type/globalType";
import ListContent from "./ListContent/ListContent";
import AllPageListHeader from "./ListHeader/AllPageListHeader";

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

export default function AllPageNoteList() {
  const classes = useStyles();

  const allNotes = useSelector((store: StoreType) => store.notes);

  return (
    <div>
      <List className={classes.root}>
        {/* This is the notebook title and utility button */}
        <AllPageListHeader />
        {/* The below are all the notes within the notebook, brief detail */}
        <div className={classes.itemDisplay}>
          {/* Some special item have a star to show that they are in shortcut */}
          {allNotes.map((note) => {
            return !note.inTrash ? (
              <ListContent key={note.id} {...note} />
            ) : null;
          })}
        </div>
      </List>
    </div>
  );
}
