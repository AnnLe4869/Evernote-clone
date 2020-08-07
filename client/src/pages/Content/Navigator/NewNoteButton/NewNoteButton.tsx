import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(2),
    width: "calc(100% - 45px)",
    borderRadius: "20px;",
    color: "inherit",
  },
}));

const buttonTheme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function NewNoteButton() {
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={buttonTheme}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<AddIcon />}
          className={classes.addButton}
        >
          New note
        </Button>
      </ThemeProvider>
    </div>
  );
}
