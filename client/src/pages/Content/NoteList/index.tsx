import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import ListHeader from "./ListHeader/ListHeader";
import ListContent from "./ListContent/ListContent";
import { useSelector, useDispatch } from "react-redux";
import {
  NoteType,
  UserType,
  StoreType,
  NotebookType,
  ParamType,
} from "../../../redux/type/globalType";
import { fetchAllNotes } from "../../../redux/actions/noteAction";
import { useRouteMatch, useParams } from "react-router-dom";



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

export default function NoteList() {
  const classes = useStyles();
  const { notebookId } = useParams<ParamType>();

  const allNotes = useSelector((store: StoreType) => store.notes);
  const allNotebooks = useSelector((store: StoreType) => store.notebooks);

  const [selectedNotebook, setSelectedNotebook] = useState<NotebookType>(
    allNotebooks[0]
  );
  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>(allNotes);

  useEffect(
    () => {
      const notebook = allNotebooks.find(
        (notebook) => notebook.id === notebookId
      );
      if (notebook) setSelectedNotebook(notebook);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allNotes.length, allNotebooks.length, notebookId]
  );

  useEffect(
    () => {
      setFilteredNotes(
        allNotes.filter((note) => selectedNotebook.notes.includes(note.id))
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allNotes.length, allNotebooks.length, notebookId]
  );

  if (!filteredNotes) return <div>Loading</div>;

  return (
    <div>
      <List className={classes.root}>
        {/* This is the notebook title and utility button */}
        <ListHeader />
        {/* The below are all the notes within the notebook, brief detail */}
        <div className={classes.itemDisplay}>
          {/* Some special item have a star to show that they are in shortcut */}
          {filteredNotes.map((note) => {
            return !note.inTrash ? (
              <ListContent key={note.id} {...note} />
            ) : null;
          })}
        </div>
      </List>
    </div>
  );
}
