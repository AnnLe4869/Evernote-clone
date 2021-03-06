import React, { useState } from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const shareNoteHeaderDialogTheme = createMuiTheme({
  palette: {
    primary: green,
  },
});

interface Props {
  dialogOpenStatus: boolean;
  handleCloseDialog: () => void;
}

export default function ShareHeaderDialog({
  dialogOpenStatus,
  handleCloseDialog,
}: Props) {
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  return (
    <Dialog
      open={dialogOpenStatus}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">Share note name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Write the email of the people you want to view or edit the note.Write
          the email of the people you want to view or edit the note
        </DialogContentText>
        <Grid container spacing={1}>
          <Grid item md={8}>
            <TextField
              id="email"
              autoFocus
              fullWidth
              value="email"
              type="email"
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              id="isAllowEdit"
              select
              fullWidth
              value={isAllowEdit}
              onChange={(e) => setIsAllowEdit(e.target.value === "edit")}
            >
              <MenuItem key="edit" value="edit">
                Can view and edit
              </MenuItem>
              <MenuItem key="view" value="view">
                Can view only
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ThemeProvider theme={shareNoteHeaderDialogTheme}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseDialog}
          >
            Send
          </Button>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  );
}
