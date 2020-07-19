import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  headerSubtitle: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

export default function ListHeaderFootnote() {
  const classes = useStyles();

  return (
    <Typography
      component="span"
      variant="subtitle2"
      color="textSecondary"
      className={classes.headerSubtitle}
    >
      3 notes
    </Typography>
  );
}
