import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  headerText: {
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.03em",
  },
}));

export default function ListHeaderTitle() {
  const classes = useStyles();

  return (
    <ListItemText
      primary={
        <React.Fragment>
          <Typography
            component="span"
            variant="h5"
            color="textPrimary"
            className={classes.headerText}
          >
            Notebook title
          </Typography>
        </React.Fragment>
      }
    />
  );
}
