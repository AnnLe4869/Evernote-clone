import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import StarIcon from "@material-ui/icons/Star";
import { NoteType } from "../../../../redux/type/type";
import {
  setSelectedNote,
  updateNote,
} from "../../../../redux/actions/noteAction";
import { useDispatch } from "react-redux";

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
    //color: "#f5cc05",
    fontSize: 15,
    verticalAlign: "-0.1em",
    marginLeft: theme.spacing(1),
  },
}));

export default function ListContent(props: NoteType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    id,
    title,
    content,
    timestamp,
    creator,
    inShortcut,
    inTrash,
    shareWith,
  } = props;

  const selectItem = () => {
    dispatch(setSelectedNote(id));
  };
  const addItemToShortcut = () => {
    dispatch(
      updateNote({
        id,
        content,
        title,
        timestamp,
        creator,
        inTrash,
        inShortcut: true,
        shareWith,
      })
    );
  };

  return (
    <ListItem
      alignItems="flex-start"
      button
      className={classes.listItem}
      onClick={selectItem}
    >
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              component="div"
              variant="h6"
              color="textPrimary"
              className={classes.itemPrimaryText}
            >
              {title}
              <StarIcon
                className={classes.itemStarIcon}
                style={{ color: inShortcut ? "#f5cc05" : "#666" }}
                onClick={addItemToShortcut}
              />
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
              {content}
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
        {timestamp}
      </Typography>
      <Divider component="li" />
    </ListItem>
  );
}
