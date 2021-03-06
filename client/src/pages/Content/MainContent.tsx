import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { fetchAllNotes } from "../../redux/actions/noteAction";
import { fetchAllNotebooks } from "../../redux/actions/notebookAction";
import AllPageEditor from "./Editor/AllPageEditor";
import FilteredPageEditor from "./Editor/FilteredPageEditor";
import ShortcutsPageEditor from "./Editor/ShortcutsPageEditor";
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

  const [open, setOpen] = useState(!matches);
  const [expandStatus, setExpandStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchAllNotes());
    dispatch(fetchAllNotebooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <CssBaseline />
      {!expandStatus ? (
        <Navigator open={open} setOpen={(value) => setOpen(value)} />
      ) : null}
      <Switch>
        {/**
         * Show all notebooks
         * This is default page user see after signing in
         *
         */}
        <Route path={`/main/notebooks`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent
                open={open}
                expandStatus={expandStatus}
                cssStyle={{ overflow: "visible" }}
              >
                <NotebookList />
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
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
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <AllPageLoading />
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>

        {/* "Stop" for filtered page */}
        <Route path={`/main/notebooks/:notebookId/notes`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <FilteredPageLoading />
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>

        {/* "Stop" for shortcuts page */}
        <Route path={`/main/shortcuts/notes`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <ShortcutsPageLoading />
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>

        {/* "Stop" for trash page */}
        <Route path={`/main/trash/notes`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <TrashPageLoading />
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>

        {/**
         *
         * This is actual page that user will see
         *
         */}
        {/* All notes show page, specific */}
        <Route path={`/main/notes/:noteId`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <Grid item md={4} sm={12}>
                  <AllPageNoteList />
                </Grid>
                <Grid item md={8} sm={12}>
                  <AllPageEditor
                    setExpandStatus={() => setExpandStatus(!expandStatus)}
                  />
                </Grid>
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>

        {/* Filtered notes page, specific */}
        <Route path={`/main/notebooks/:notebookId/notes/:noteId`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <Grid item md={4} sm={12}>
                  <FilteredPageNoteList />
                </Grid>
                <Grid item md={8} sm={12}>
                  <FilteredPageEditor
                    setExpandStatus={() => setExpandStatus(!expandStatus)}
                  />
                </Grid>
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>

        {/* Shortcuts notes page, blank version in case no notes in Shortcuts */}
        <Route path={`/main/shortcuts/notes/blank`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <Grid item md={4} sm={12}>
                  <ShortcutsPageNoteList />
                </Grid>
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>
        {/* Shortcuts notes page, specific */}
        <Route path={`/main/shortcuts/notes/:noteId`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <Grid item md={4} sm={12}>
                  <ShortcutsPageNoteList />
                </Grid>
                <Grid item md={8} sm={12}>
                  <ShortcutsPageEditor
                    setExpandStatus={() => setExpandStatus(!expandStatus)}
                  />
                </Grid>
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>

        {/* Trash notes page, in case there is no notes in Trash */}
        <Route path={`/main/trash/notes/blank`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
              <ExpandWrapperComponent open={open} expandStatus={expandStatus}>
                <Grid item md={4} sm={12}>
                  <TrashPageNoteList />
                </Grid>
              </ExpandWrapperComponent>
            </CSSTransition>
          )}
        </Route>
        {/* Trash notes page, specific */}
        <Route path={`/main/trash/notes/:noteId`} exact>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={50}
              classNames="fade"
              unmountOnExit
            >
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
            </CSSTransition>
          )}
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
            ...props.cssStyle,
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
            ...props.cssStyle,
          }}
        >
          {props.children}
        </Grid>
      )}
    </>
  );
}
