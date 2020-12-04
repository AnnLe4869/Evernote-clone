import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useNoteFromId from "../../../../../utils/useNoteFromId";

const useStyles = makeStyles((theme) => ({
  headerFootnote: {
    marginLeft: theme.spacing(2),
    position: "relative",
    left: theme.spacing(0),
    top: theme.spacing(2),
  },
}));

export default function HeaderFootnote() {
  const classes = useStyles();

  const { note } = useNoteFromId();

  return (
    <Typography
      component="h5"
      color="textSecondary"
      variant="subtitle2"
      display="block"
      className={classes.headerFootnote}
    >
      Last edit at {note?.timestamp}
    </Typography>
  );
}
