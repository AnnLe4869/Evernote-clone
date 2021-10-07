import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../../redux/type/globalType";
import useNotebookFromPath from "../../../../../utils/useNotebookFromPath";

const useStyles = makeStyles((theme) => ({
  headerSubtitle: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

export default function FilteredPageListHeaderFootnote() {
  const classes = useStyles();
  const { notebook } = useNotebookFromPath();
  const allNotes = useSelector((store: StoreType) => store.notes);

  return (
    <Typography
      component="span"
      variant="subtitle2"
      color="textSecondary"
      className={classes.headerSubtitle}
    >
      {/* Note must be in the notebook and not in trash */}
      {
        allNotes.filter(
          (note) => notebook?.notes.includes(note.id) && !note.inTrash
        ).length
      }{" "}
      notes
    </Typography>
  );
}
