import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { fetchAllNotes } from "../../redux/actions/noteAction";
import {
  addNewNotebook,
  fetchAllNotebooks,
} from "../../redux/actions/notebookAction";
import { MY_HOME } from "../../redux/constants/constants";
import { StoreType } from "../../redux/type/globalType";
import Editor from "./Editor/Editor";
import TrashPageEditor from "./Editor/TrashPageEditor";
import AllPageLoading from "./Loading/AllPageLoading";
import FilteredPageLoading from "./Loading/FilteredPageLoading";
import ShortcutsPageLoading from "./Loading/ShortcutsPageLoading";
import TrashPageLoading from "./Loading/TrashPageLoading";
import Navigator from "./Navigator/Navigator";
import NotebookList from "./NotebookList/NotebookList";
import AllPageNoteList from "./NoteList/AllPageNoteList";
import FilteredPageNoteList from "./NoteList/FilteredPageNoteList";
import ShortcutsPageNoteList from "./NoteList/ShortcutsPageNoteList";
import TrashPageNoteList from "./NoteList/TrashPageNoteList";

export default function Main() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  // useRouteMatch();

  const notesLoading = useSelector(
    (store: StoreType) => store.loading.notesLoading
  );
  const notebooksLoading = useSelector(
    (store: StoreType) => store.loading.notebooksLoading
  );

  const [open, setOpen] = useState(!matches);
  const [expandStatus, setExpandStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchAllNotes());
    dispatch(fetchAllNotebooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!notebooksLoading && !notesLoading) {
      dispatch(addNewNotebook(MY_HOME));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebooksLoading, notesLoading]);

  return (
    <div>
      <CssBaseline />

      <Switch>
        {/**
         * Show all notebooks
         * This is default page user see after signing in
         *
         */}
        <Route path={`/main/notebooks`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <NotebookList />
          </ExpandWrapperComponent>
        </Route>

        {/**
         *
         * This is "temporary stop" so that we can fetch data from store that we need for constructing URL
         * Usually is :noteId
         * After that it will redirect to specific page
         *
         */}

        {/* "Stop" for all notes page */}
        <Route path={`/main/notes`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <AllPageLoading />
          </ExpandWrapperComponent>
        </Route>

        {/* "Stop" for filtered page */}
        <Route path={`/main/notebooks/:notebookId/notes`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <FilteredPageLoading />
          </ExpandWrapperComponent>
        </Route>

        {/* "Stop" for shortcuts page */}
        <Route path={`/main/shortcuts/notes`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <ShortcutsPageLoading />
          </ExpandWrapperComponent>
        </Route>

        {/* "Stop" for trash page */}
        <Route path={`/main/trash/notes`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <TrashPageLoading />
          </ExpandWrapperComponent>
        </Route>

        {/**
         *
         * This is actual page that user will see
         *
         */}
        {/* All notes show page, specific */}
        <Route path={`/main/notes/:noteId`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <Grid item md={4} sm={12}>
              <AllPageNoteList />
            </Grid>
            <Grid item md={8} sm={12}>
              <Editor setExpandStatus={() => setExpandStatus(!expandStatus)} />
            </Grid>
          </ExpandWrapperComponent>
        </Route>

        {/* Filtered notes page, specific */}
        <Route path={`/main/notebooks/:notebookId/notes/:noteId`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <Grid item md={4} sm={12}>
              <FilteredPageNoteList />
            </Grid>
            <Grid item md={8} sm={12}>
              <Editor setExpandStatus={() => setExpandStatus(!expandStatus)} />
            </Grid>
          </ExpandWrapperComponent>
        </Route>

        {/* Shortcuts notes page, blank version in case no notes in Shortcuts */}
        <Route path={`/main/shortcuts/notes/blank`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <Grid item md={4} sm={12}>
              <ShortcutsPageNoteList />
            </Grid>
          </ExpandWrapperComponent>
        </Route>
        {/* Shortcuts notes page, specific */}
        <Route path={`/main/shortcuts/notes/:noteId`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <Grid item md={4} sm={12}>
              <ShortcutsPageNoteList />
            </Grid>
            <Grid item md={8} sm={12}>
              <Editor setExpandStatus={() => setExpandStatus(!expandStatus)} />
            </Grid>
          </ExpandWrapperComponent>
        </Route>

        {/* Trash notes page, in case there is no notes in Trash */}
        <Route path={`/main/trash/notes/blank`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <Grid item md={4} sm={12}>
              <TrashPageNoteList />
            </Grid>
          </ExpandWrapperComponent>
        </Route>
        {/* Trash notes page, specific */}
        <Route path={`/main/trash/notes/:noteId`} exact>
          {!expandStatus ? (
            <Navigator open={open} setOpen={(value) => setOpen(value)} />
          ) : null}
          <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
            <Grid item md={4} sm={12}>
              <TrashPageNoteList />
            </Grid>
            <Grid item md={8} sm={12}>
              <TrashPageEditor
                setExpandStatus={() => setExpandStatus(!expandStatus)}
              />
            </Grid>
          </ExpandWrapperComponent>
        </Route>

        {/**
         *
         * Redirect for any unrecognized routes
         *
         */}
        <Redirect to={`/main/notebooks`} />
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

function ExpandWrapperComponent(props: any) {
  return (
    <>
      {props.expandStatus ? (
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
            paddingLeft: props.open ? "18vw" : "",
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
