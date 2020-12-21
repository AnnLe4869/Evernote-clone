import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../../redux/type/globalType";

const useStyles = makeStyles((theme) => ({
  headerSubtitle: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

export default function AllPageListHeaderFootnote() {
  const classes = useStyles();
  const allNotes = useSelector((store: StoreType) => store.notes);
  return (
    <Typography
      component="span"
      variant="subtitle2"
      color="textSecondary"
      className={classes.headerSubtitle}
    >
      {allNotes.filter((note) => !note.inTrash).length} notes
    </Typography>
  );
}
