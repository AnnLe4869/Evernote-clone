import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@material-ui/core/SvgIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/People";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const drawerWidth = "18vw";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  menuButton: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 1200,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  search: {
    position: "relative",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
        className={clsx(classes.menuButton, open && classes.hide)}
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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <Divider />

        {/* This is the list of options to select from */}
        <List>
          {/* Show all shortcuts */}
          <ListItem button key="Shortcuts">
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Shortcuts" />
          </ListItem>
          {/* Show all notes */}
          <ListItem button key="All Notes">
            <ListItemIcon>
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M15 3H5A2 2 0 0 0 3 5V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V9L15 3M19 19H5V5H14V10H19M17 14H7V12H17M14 17H7V15H14"
                />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="All Notes" />
          </ListItem>
          {/* Show all notebooks */}
          <ListItem button key="Notebooks">
            <ListItemIcon>
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M3,7V5H5V4C5,2.89 5.9,2 7,2H13V9L15.5,7.5L18,9V2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M7,11H5V13H7V11M7,7V5H5V7H7M7,19V17H5V19H7Z"
                />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Notebooks" />
          </ListItem>
          {/* Show all files that are shared to me */}
          <ListItem button key="Shared with me">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Shared with me" />
          </ListItem>
          {/* Show all file that has been deleted */}
          <ListItem button key="Deleted">
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Deleted" />
          </ListItem>
        </List>
        <Divider />
        {/* This is the button to collapse the navigation bar */}
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
}
