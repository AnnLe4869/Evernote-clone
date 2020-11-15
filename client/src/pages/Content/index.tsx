import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Editor from "./Editor";
import Navigator from "./Navigator";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import NotebookList from "./NotebookList";
import AllNoteLoading from "./Loading/AllNoteLoading";
import FilterNoteLoading from "./Loading/FilterNoteLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../../redux/actions/noteAction";
import {
  addNewNotebook,
  fetchAllNotebooks,
} from "../../redux/actions/notebookAction";
import NoteListAllNotes from "./NoteList/AllNotes";
import NoteListFilteredNotes from "./NoteList/FilteredNotes";
import { StoreType } from "../../redux/type/globalType";
import { MY_HOME } from "../../redux/constants/constants";

export default function Main() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const loading = useSelector((store: StoreType) => store.loading);

  const [open, setOpen] = useState(!matches);
  const [expandStatus, setExpandStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchAllNotes());
    dispatch(fetchAllNotebooks());
  }, []);

  useEffect(() => {
    console.log(
      "%c noteLoading status: " + loading.notesLoading,
      "background-color: yellow"
    );
  });

  useEffect(() => {
    if (!loading.notebooksLoading && !loading.notesLoading)
      dispatch(addNewNotebook(MY_HOME));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading.notebooksLoading, loading.notesLoading]);

  function ExpandWrapperComponent(props: any) {
    return (
      <>
        {expandStatus ? (
          <Grid
            container
            component="main"
            style={{
              height: "100vh",
              overflow: "hidden",
            }}
          >
            {props.children}
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
            {props.children}
          </Grid>
        )}
      </>
    );
  }

  return (
    <div>
      <CssBaseline />

      <Switch>
        <Route path={`${url}/notebooks`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent>
            <NotebookList />
          </ExpandWrapperComponent>
        </Route>
        <Route path={`${url}/notes`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent>
            <AllNoteLoading />
          </ExpandWrapperComponent>
        </Route>
        <Route path={`${url}/notebooks/:notebookId/notes`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent>
            <FilterNoteLoading />
          </ExpandWrapperComponent>
        </Route>

        <Route path={`${url}/notes/:noteId`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent>
            <Grid item md={4} sm={12}>
              <NoteListAllNotes />
            </Grid>
            <Grid item md={8} sm={12}>
              <Editor setExpandStatus={() => setExpandStatus(!expandStatus)} />
            </Grid>
          </ExpandWrapperComponent>
        </Route>

        <Route path={`${url}/notebooks/:notebookId/notes/:noteId`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent>
            <Grid item md={4} sm={12}>
              <NoteListFilteredNotes />
            </Grid>
            <Grid item md={8} sm={12}>
              <Editor setExpandStatus={() => setExpandStatus(!expandStatus)} />
            </Grid>
          </ExpandWrapperComponent>
        </Route>

        <Redirect to={`${url}/notebooks`} />
      </Switch>

      {/* {!expandStatus ? (
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
      )} */}
    </div>
  );
}
