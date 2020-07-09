import React from "react";
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
  return (
    <div>
      <CssBaseline />
      <Navigator />
      <Grid
        container
        component="main"
        style={{ height: "100vh", marginLeft: matches ? "18vw" : null }}
      >
        <Grid item md={6} sm={12}>
          <NoteList />
        </Grid>
        <Grid item md={6} sm={12}>
          <Editor />
        </Grid>
      </Grid>
    </div>
  );
}
