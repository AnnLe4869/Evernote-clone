import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addNewNote } from "../../../../redux/actions/noteAction";
import { MY_HOME } from "../../../../redux/constants/constants";
import { ParamType, StoreType } from "../../../../redux/type/globalType";

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
  const dispatch = useDispatch();
  const allNotebooks = useSelector((store: StoreType) => store.notebooks);
  const { notebookId } = useParams<ParamType>();

  const handleClick = () => {
    // Check if there is notebook specified in the URL
    if (notebookId) {
      // Find the notebook accordingly
      const notebook = allNotebooks.find(
        (notebook) => notebook.id === notebookId
      );
      // This check is just to go around the undefined error of the TypeScript
      if (notebook) dispatch(addNewNote(notebook));
    } else {
      // If there is no notebook ID specified, i.e all notes mode
      const notebook = allNotebooks.find(
        // We choose our default notebook as location to create new note
        (notebook) => notebook.name === MY_HOME
      );
      if (notebook) dispatch(addNewNote(notebook));
    }
  };

  return (
    <div>
      <ThemeProvider theme={buttonTheme}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<AddIcon />}
          className={classes.addButton}
          onClick={handleClick}
        >
          New note
        </Button>
      </ThemeProvider>
    </div>
  );
}
