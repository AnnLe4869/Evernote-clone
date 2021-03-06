import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NoteType, StoreType } from "../../../redux/type/globalType";
import TrashPageListContent from "./ListContent/TrashPageListContent";
import TrashPageListHeader from "./ListHeader/TrashPageListHeader";

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

export default function TrashPageNoteList() {
  const classes = useStyles();

  const allNotes = useSelector((store: StoreType) => store.notes);

  const [noteInTrash, setNoteInTrash] = useState<NoteType[]>(allNotes);

  useEffect(
    () => {
      setNoteInTrash(allNotes.filter((note) => note.inTrash));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allNotes]
  );

  // In case there is no note in Trash we only render the ListHeader
  if (!noteInTrash)
    return (
      <div>
        <List className={classes.root}>
          {/* This is the notebook title and utility button */}
          <TrashPageListHeader />
        </List>
      </div>
    );

  return (
    <div>
      <List className={classes.root}>
        {/* This is the notebook title and utility button */}
        <TrashPageListHeader />
        {/* The below are all the notes within the notebook, brief detail */}
        <div className={classes.itemDisplay}>
          {noteInTrash.map((note) => (
            <TrashPageListContent key={note.id} {...note} />
          ))}
        </div>
      </List>
    </div>
  );
}
