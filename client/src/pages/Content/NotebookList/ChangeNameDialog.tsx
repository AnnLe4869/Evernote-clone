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
import { NotebookType } from "../../../redux/type/globalType";
import { changeNotebookName } from "../../../redux/actions/notebookAction";

interface Props {
  dialogOpen: boolean;
  closeDialog: () => void;
  notebook: NotebookType;
}

export default function ChangeNameDialog(props: Props) {
  const { dialogOpen, closeDialog, notebook } = props;

  const dispatch = useDispatch();

  const [notebookName, setNotebookName] = useState<string>(notebook.name);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNotebookName(event.target.value);
  };

  const submitNameChange = () => {
    dispatch(changeNotebookName(notebook, notebookName));
    closeDialog();
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Rename notebook</DialogTitle>
        <DialogContent>
          <DialogContentText>Name</DialogContentText>
          <TextField
            autoFocus
            value={notebookName}
            onChange={handleChange}
            margin="dense"
            id="name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={submitNameChange}
            color="primary"
            variant="contained"
            disabled={notebookName === "" || notebook.name === notebookName}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
