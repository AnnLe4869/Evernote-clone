import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  item: {
    height: "8rem",
    position: "relative",
  },
  subtitle: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  headerText: {
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.03em",
  },
  action: {
    position: "absolute",
    right: theme.spacing(0),
    bottom: theme.spacing(0),
  },
}));

export default function NoteList() {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" className={classes.item}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="h5"
                  color="textPrimary"
                  className={classes.headerText}
                >
                  Notebook title
                </Typography>
              </React.Fragment>
            }
          />
          <Typography
            component="span"
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            Notebook title
          </Typography>
          <IconButton className={classes.action}>
            <MoreHorizIcon />
          </IconButton>
        </ListItem>
        <Divider component="li" />

        <ListItem alignItems="flex-start" button className={classes.item}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography component="div" variant="h6" color="textPrimary">
                  to Scott, Alex, Jennifer
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="subtitle2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider component="li" />

        <ListItem alignItems="flex-start" button className={classes.item}>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="subtitle2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider component="li" />
      </List>
    </div>
  );
}
