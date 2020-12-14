import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addNoteToNotebook,
  removeNoteFromNotebook,
} from "../../../../../redux/actions/notebookAction";
import { NotebookType } from "../../../../../redux/type/globalType";
import useNotebook from "../../../../../utils/useNotebook";
import useNotebookFromNote from "../../../../../utils/useNotebookFromNote";
import useNoteFromPath from "../../../../../utils/useNoteFromPath";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const useStyles = makeStyles(() => ({
  dialog: {
    overflow: "hidden",
  },
  dialogItemDisplay: {
    height: "calc(100vh - 64px - 230px)",
    overflowY: "auto",
    boxSizing: "content-box",
    scrollbarColor: "transparent",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slate grey",
    },
  },
}));

interface Props {
  dialogOpenStatus: boolean;
  handleCloseDialog: () => void;
}

export default function MoveNoteHeaderDialog({
  dialogOpenStatus,
  handleCloseDialog,
}: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { note: currentNote, allNotes } = useNoteFromPath();
  const { allNotebooks } = useNotebook();
  const { notebook: currentNotebook } = useNotebookFromNote();

  const [chosenNotebook, setChosenNotebook] = useState(currentNotebook);

  // Update the chosenNotebook when the notebook fetch from hook change
  // This should run only once throughout the component life, as the notebook shouldn't change
  useEffect(() => {
    setChosenNotebook(currentNotebook);
  }, [currentNotebook]);

  // Select a notebook
  const chooseNotebook = (notebook: NotebookType) => {
    setChosenNotebook(notebook);
  };

  // Move note to different notebook
  // Run only when user click Move button
  const moveNoteToNotebook = () => {
    if (currentNote && chosenNotebook && currentNotebook) {
      dispatch(removeNoteFromNotebook(currentNote, currentNotebook));
      dispatch(addNoteToNotebook(currentNote, chosenNotebook));
    }
    handleCloseDialog();

    // Because the action is async so the change won't reflect immediately
    // Sometimes the note is "top" in alphabet order and thus,
    // still be the "selected" note, and the editor display that note content
    // Do a simple check so that we always go to the right route
    const notesBelongToCurrentNotebook = allNotes.filter((note) =>
      currentNotebook.notes.includes(note.id)
    );

    if (notesBelongToCurrentNotebook[0].id === currentNote?.id) {
      history.push(
        `/main/notebooks/${currentNotebook?.id}/notes/${notesBelongToCurrentNotebook[1].id}`
      );
    } else {
      history.push(`/main/notebooks/${currentNotebook?.id}/notes`);
    }
  };

  return (
    <>
      <Dialog
        open={dialogOpenStatus}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">Move note to</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Find the location you want to move the file to or just click the one
            you want
          </DialogContentText>
          <TextField
            id="email"
            //autoFocus
            variant="outlined"
            size="small"
            label="Find the location"
            fullWidth
          />
          {/* Show list of all notebook to move to */}
          <List
            component="nav"
            aria-label="main"
            className={classes.dialogItemDisplay}
          >
            {allNotebooks.map((item) => {
              if (currentNotebook?.id === item.id) {
                return (
                  // This one has special title to indicate current notebook
                  <ListItem
                    button
                    selected={chosenNotebook?.id === item.id}
                    key={item.id}
                  >
                    <ListItemIcon>
                      <SvgIcon>
                        <path
                          fill="currentColor"
                          d="M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7V5H5V4C5,2.89 5.9,2 7,2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M5,5V7H7V5H5M5,19H7V17H5V19M5,13H7V11H5V13Z"
                        />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body1">
                          {item.name} {"     "}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          color="textSecondary"
                        >
                          (current)
                        </Typography>
                      }
                    />
                  </ListItem>
                );
              }
              return (
                // Other just show normal text
                <ListItem
                  button
                  onClick={() => chooseNotebook(item)}
                  selected={chosenNotebook?.id === item.id}
                  key={item.id}
                >
                  <ListItemIcon>
                    <SvgIcon>
                      <path
                        fill="currentColor"
                        d="M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7V5H5V4C5,2.89 5.9,2 7,2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M5,5V7H7V5H5M5,19H7V17H5V19M5,13H7V11H5V13Z"
                      />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        {/* After we choose the place to move to we click the Move button */}
        <DialogActions>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="primary"
              onClick={moveNoteToNotebook}
            >
              Move
            </Button>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Cancel
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </>
  );
}
