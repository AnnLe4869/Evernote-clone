import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewNotebook } from "../../../redux/actions/notebookAction";
import { NotebookType } from "../../../redux/type/globalType";

interface Props {
  dialogOpen: boolean;
  closeDialog: () => void;
  notebook: NotebookType;
}

export default function ShareNotebookDialog(props: Props) {
  const { dialogOpen, closeDialog } = props;

  const dispatch = useDispatch();

  const [notebookName, setNotebookName] = useState<string>("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNotebookName(event.target.value);
  };

  const createNotebook = () => {
    dispatch(addNewNotebook(notebookName));
    closeDialog();
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new notebook</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notebooks are useful for grouping notes around a common topic. They
            can be private or shared.
          </DialogContentText>
          <TextField
            autoFocus
            value={notebookName}
            onChange={handleChange}
            margin="dense"
            id="name"
            label="Notebook name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={createNotebook}
            color="primary"
            variant="contained"
            disabled={notebookName === ""}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
