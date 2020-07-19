import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DeleteIcon from "@material-ui/icons/Delete";

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
    <ListItem button key="Deleted" className={classes.listItem}>
      <ListItemIcon className={classes.icon}>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Deleted" />
    </ListItem>
  );
}
