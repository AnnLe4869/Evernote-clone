import React, { useState, useEffect } from "react";
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
  const [expandStatus, setExpandStatus] = useState(false);

  // useEffect(() => {
  //   firebase
  //     .auth()
  //     .currentUser.getIdToken(true)
  //     .then((token) => console.log(token));
  // });

  return (
    <div>
      <CssBaseline />
      {!expandStatus ? (
        <Navigator open={open} setOpen={(value) => setOpen(value)} />
      ) : null}

      {expandStatus ? (
        <Grid
          container
          component="main"
          style={{
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Grid item md={12} sm={12}>
            <Editor setExpandStatus={() => setExpandStatus(!expandStatus)} />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          component="main"
          style={{
            paddingLeft: open ? "18vw" : "",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Grid item md={4} sm={12}>
            <NoteList />
          </Grid>
          <Grid item md={8} sm={12}>
            <Editor setExpandStatus={() => setExpandStatus(!expandStatus)} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
