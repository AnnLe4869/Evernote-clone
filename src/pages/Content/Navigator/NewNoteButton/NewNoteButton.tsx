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
import { useHistory, useRouteMatch } from "react-router-dom";
import { addNewNote } from "../../../../redux/actions/noteAction";
import { MY_HOME } from "../../../../redux/constants/constants";
import { StoreType } from "../../../../redux/type/globalType";

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: theme.spacing(2),
    width: "100%",
    borderRadius: "20px",
    color: "inherit",
  },
  container: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const newNoteButtonTheme = createMuiTheme({
  palette: {
    primary: green,
  },
});

interface MatchParams {
  notebookId: string;
}

export default function FilteredPageNewNoteButton() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const allNotebooks = useSelector((store: StoreType) => store.notebooks);

  const filteredPageMatch = useRouteMatch<MatchParams>(
    "/main/notebooks/:notebookId/notes"
  );
  const trashPageMatch = useRouteMatch("/main/trash");
  const shortcutsPageMatch = useRouteMatch("/main/shortcuts");
  const notebookListPageMatch = useRouteMatch("/main/notebooks");

  const handleClick = () => {
    // Check if the user is in the trash page or shortcuts page or notebooks page
    if (trashPageMatch || shortcutsPageMatch || notebookListPageMatch) {
      // If it's, find the MY_HOME notebook and add the note to it
      const notebook = allNotebooks.find(
        (notebook) => notebook.name === MY_HOME
      );
      if (notebook)
        dispatch(
          addNewNote(notebook, () => {
            // After the operation redirect to allNotes page
            history.push("/main/notes");
          })
        );

      return;
    }

    // Check if there is notebook specified in the URL
    if (filteredPageMatch && filteredPageMatch.params.notebookId) {
      // Find the notebook accordingly
      const notebook = allNotebooks.find(
        (notebook) => notebook.id === filteredPageMatch.params.notebookId
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
    <div className={classes.container}>
      <ThemeProvider theme={newNoteButtonTheme}>
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
