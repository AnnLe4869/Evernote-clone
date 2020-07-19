import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#ccc",
  },

  listItem: {
    "&:hover": {
      backgroundColor: "#333",
    },
  },
}));

export default function ShortcutView() {
  const classes = useStyles();

  return (
    <ListItem button key="Shortcuts" className={classes.listItem}>
      <ListItemIcon>
        <StarIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary="Shortcuts" />
    </ListItem>
  );
}
