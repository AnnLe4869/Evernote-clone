import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Editor from "./Editor";
import Navigator from "./Navigator";
import NoteList from "./NoteList";

export default function Main() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(!matches);

  return (
    <div>
      <CssBaseline />
      <Navigator open={open} setOpen={setOpen} />
      <Grid
        container
        component="main"
        style={{
          paddingLeft: open ? "18vw" : null,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Grid item md={4} sm={12}>
          <NoteList />
        </Grid>
        <Grid item md={7} sm={12}>
          <Editor />
        </Grid>
      </Grid>
    </div>
  );
}
