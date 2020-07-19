import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SvgIcon from "@material-ui/core/SvgIcon";

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
    <ListItem button key="All Notes" className={classes.listItem}>
      <ListItemIcon className={classes.icon}>
        <SvgIcon>
          <path
            fill="currentColor"
            d="M15 3H5A2 2 0 0 0 3 5V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V9L15 3M19 19H5V5H14V10H19M17 14H7V12H17M14 17H7V15H14"
          />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary="All Notes" />
    </ListItem>
  );
}
