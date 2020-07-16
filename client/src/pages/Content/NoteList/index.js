import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarIcon from "@material-ui/icons/Star";

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
    marginRight: theme.spacing(1),
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

export default function NoteList() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <List className={classes.root}>
        {/* This is the notebook title and utility button */}
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
          <IconButton className={classes.headerAction} onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>Share notebook</MenuItem>
            <MenuItem onClick={handleClose}>Share notebook</MenuItem>
            <MenuItem onClick={handleClose}>Share notebook</MenuItem>
          </Menu>
        </ListItem>
        <Divider component="li" />

        {/* The below are item */}
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
