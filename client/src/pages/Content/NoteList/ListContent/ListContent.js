import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  listItem: {
    height: "8rem",
    position: "relative",
  },
  itemPrimaryText: {
    fontSize: 14,
    fontWeight: 600,
  },
  itemSubtitle: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  itemDisplay: {
    height: "calc(100vh - 8rem)",
    overflowY: "auto",
    boxSizing: "content-box",
    scrollbarColor: "transparent",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slate grey",
    },
  },
  itemStarIcon: {
    color: "#f5cc05",
    fontSize: 15,
    verticalAlign: "-0.1em",
    marginLeft: theme.spacing(1),
  },
}));

export default function ListContent() {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" button className={classes.listItem}>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              component="div"
              variant="h6"
              color="textPrimary"
              className={classes.itemPrimaryText}
            >
              Item title
              <StarIcon className={classes.itemStarIcon} />
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="subtitle2"
              color="textSecondary"
            >
              Item content
            </Typography>
          </React.Fragment>
        }
      />
      <Typography
        component="span"
        variant="subtitle2"
        color="textSecondary"
        className={classes.itemSubtitle}
      >
        Date of editing
      </Typography>
      <Divider component="li" />
    </ListItem>
  );
}
