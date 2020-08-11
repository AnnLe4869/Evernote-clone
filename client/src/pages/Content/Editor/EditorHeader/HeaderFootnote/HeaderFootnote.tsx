import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  headerFootnote: {
    marginLeft: theme.spacing(2),
    position: "relative",
    left: theme.spacing(0),
    top: theme.spacing(2),
  },
}));

export default function HeaderFootnote({ timestamp }: { timestamp: string }) {
  const classes = useStyles();

  return (
    <Typography
      component="h5"
      color="textSecondary"
      variant="subtitle2"
      display="block"
      className={classes.headerFootnote}
    >
      Last edit at {timestamp}
    </Typography>
  );
}
