import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { permanentDeleteNote } from "../../../../../redux/actions/noteAction";
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

export default function DeleteConfirmDialog({
  dialogOpenStatus,
  handleCloseDialog,
}: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { note: currentNote } = useNoteFromPath();

  const deleteNoteHandler = () => {
    if (currentNote) {
      dispatch(
        // The callback run after all the async is done
        permanentDeleteNote(currentNote, () => {
          history.push("/main/trash/notes");
        })
      );
      handleCloseDialog();
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
        <DialogTitle id="form-dialog-title">Delete permanently?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Warning: The note will be gone forever. This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        {/* After we choose the place to move to we click the Move button */}
        <DialogActions>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteNoteHandler}
            >
              Delete
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </>
  );
}
