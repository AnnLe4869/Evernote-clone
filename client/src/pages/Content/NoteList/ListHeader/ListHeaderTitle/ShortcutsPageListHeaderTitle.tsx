import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import useNotebookFromNote from "../../../../../utils/useNotebookFromNote";

const useStyles = makeStyles((theme) => ({
  headerText: {
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.03em",
  },
}));

export default function ShortcutsPageHeaderTitle() {
  const classes = useStyles();

  const { notebook: currentNotebook } = useNotebookFromNote();

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
            {currentNotebook?.name}
          </Typography>
        </React.Fragment>
      }
    />
  );
}
