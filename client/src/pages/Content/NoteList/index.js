import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  listItem: {
    height: "8rem",
    position: "relative",
  },
  listHeader: {
    height: "8rem",
    position: "relative",
  },
  headerSubtitle: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  headerText: {
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.03em",
  },
  headerAction: {
    position: "absolute",
    right: theme.spacing(0),
    bottom: theme.spacing(0),
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
  },
}));

export default function NoteList() {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" className={classes.listHeader}>
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
            className={classes.headerSubtitle}
          >
            Notebook title
          </Typography>
          <IconButton className={classes.headerAction}>
            <MoreHorizIcon />
          </IconButton>
        </ListItem>
        <Divider component="li" />

        <div className={classes.itemDisplay}>
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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
          <Divider component="li" />

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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
          <Divider component="li" />

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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
          <Divider component="li" />
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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
          <Divider component="li" />
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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
          <Divider component="li" />
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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
          <Divider component="li" />
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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
          <Divider component="li" />
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
                    to Scott, Alex, Jennifer
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
                    to Scott, Alex, Jennifer
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
              Jul 13
            </Typography>
          </ListItem>
        </div>
      </List>
    </div>
  );
}
