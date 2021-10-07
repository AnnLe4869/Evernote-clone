import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SvgIcon from "@material-ui/core/SvgIcon";
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

export default function ShortcutView() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push("/main/notebooks");
  };

  return (
    <ListItem
      button
      key="Notebooks"
      className={classes.listItem}
      onClick={handleClick}
    >
      <ListItemIcon className={classes.icon}>
        <SvgIcon>
          <path
            fill="currentColor"
            d="M3,7V5H5V4C5,2.89 5.9,2 7,2H13V9L15.5,7.5L18,9V2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M7,11H5V13H7V11M7,7V5H5V7H7M7,19V17H5V19H7Z"
          />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary="Notebooks" />
    </ListItem>
  );
}
