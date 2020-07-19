import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import NavigationSearch from "./NavigatorSearch/NavigatorSearch";
import NewNoteButton from "./NewNoteButton/NewNoteButton";
import ShortcutView from "./ShortcutView/ShortcutView";
import AllNotesView from "./AllNotesView/AllNotesView";
import NotebooksView from "./NotebooksView/NotebooksView";
import ShareWithMeView from "./ShareWithMeView/ShareWithMeView";
import DeleteView from "./DeletedView/DeleteView";

const drawerWidth = "18vw";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 1200,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },
  icon: {
    color: "#ccc",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  drawerCollapseButton: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function Navigator({ open, setOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (matches) setOpen(true);
    if (!matches) setOpen(false);
  }, [matches, setOpen]);

  return (
    <div>
      {/* This is the menu button that will appear when drawer collapse */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* This is the search bar */}
        <NavigationSearch />
        {/* This is the new note button */}
        <NewNoteButton />

        {/* This is the list of options to select from */}
        <List>
          {/* Show all shortcuts */}
          <ShortcutView />
          {/* Show all notes */}
          <AllNotesView />
          {/* Show all notebooks */}
          <NotebooksView />
          {/* Show all files that are shared to me */}
          <ShareWithMeView />
          {/* Show all file that has been deleted */}
          <DeleteView />
        </List>
        {/* This is the button to collapse the navigation bar */}
        <div className={classes.drawerCollapseButton}>
          <IconButton
            onClick={handleDrawerClose}
            className={clsx(classes.icon, classes.listItem)}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
}
