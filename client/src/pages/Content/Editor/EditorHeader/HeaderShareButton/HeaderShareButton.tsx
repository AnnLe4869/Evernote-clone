import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import ShareNoteHeaderDialog from "./ShareNoteHeaderDialog";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function HeaderShareButton() {
  const [dialogOpenStatus, setDialogOpenStatus] = useState(false);

  const openDialog = () => {
    setDialogOpenStatus(true);
  };

  const closeDialog = () => {
    setDialogOpenStatus(false);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={openDialog}
        >
          Share
        </Button>
      </ThemeProvider>

      {/* This is the dialog that appear when we click the Share button */}
      <ShareNoteHeaderDialog
        dialogOpenStatus={dialogOpenStatus}
        handleCloseDialog={closeDialog}
      />
    </>
  );
}
