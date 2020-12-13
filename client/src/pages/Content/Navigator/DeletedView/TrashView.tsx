import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

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

export default function TrashView() {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = () => {
    history.push("/main/trash/notes");
  };

  return (
    <ListItem
      button
      key="Deleted"
      className={classes.listItem}
      onClick={handleClick}
    >
      <ListItemIcon className={classes.icon}>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Deleted" />
    </ListItem>
  );
}
