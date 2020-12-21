import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useEffect } from "react";
import AccountSetting from "./AccountSetting/AccountSetting";
import AllNotesView from "./AllNotesView/AllNotesView";
import TrashView from "./DeletedView/TrashView";
import NavigationSearch from "./NavigatorSearch/NavigatorSearch";
import NewNoteButton from "./NewNoteButton/NewNoteButton";
import NotebooksView from "./NotebooksView/NotebooksView";
import ShareWithMeView from "./ShareWithMeView/ShareWithMeView";
import ShortcutView from "./ShortcutView/ShortcutView";

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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Navigator({ open, setOpen }: Props) {
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
  }, [matches]);

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
        {/* This is the account setting  */}
        <AccountSetting />
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
          <TrashView />
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
