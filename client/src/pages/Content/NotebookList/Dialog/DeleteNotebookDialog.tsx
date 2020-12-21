import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import {
  completeDeleteNotebook,
  partialDeleteNotebook,
} from "../../../../redux/actions/notebookAction";
import { NotebookType } from "../../../../redux/type/globalType";

interface Props {
  dialogOpen: boolean;
  closeDialog: () => void;
  notebook: NotebookType;
}

export default function DeleteNotebookDialog(props: Props) {
  const { dialogOpen, closeDialog, notebook } = props;

  const dispatch = useDispatch();

  // This delete the notebook and every notes inside it permanently
  const handleCompleteDeleteNotebook = () => {
    dispatch(completeDeleteNotebook(notebook));
    closeDialog();
  };

  // This delete the notebook but only move notes to Trash
  const handlePartialDeleteNotebook = () => {
    dispatch(partialDeleteNotebook(notebook));
    closeDialog();
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete notebook</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete this notebook with permanently delete all notes inside it.
            This cannot be reversed. Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handlePartialDeleteNotebook}
            color="secondary"
            variant="contained"
          >
            Delete notebook but only move notes to Trash
          </Button>
          <Button
            onClick={handleCompleteDeleteNotebook}
            color="secondary"
            variant="contained"
          >
            Delete everything
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
