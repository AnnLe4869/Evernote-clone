import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
export default function HeaderShareButton({ handleClickOpenDialog }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClickOpenDialog}
        >
          Share
        </Button>
      </ThemeProvider>
    </>
  );
}
