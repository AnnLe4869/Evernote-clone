import React, { useState } from "react";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
  dialog: {
    overflow: "hidden",
  },
  dialogItemDisplay: {
    height: "calc(100vh - 64px - 230px)",
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
}));
// For the Share button
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function ListHeaderTitle() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpenStatus, setDialogOpenStatus] = useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpenStatus(true);
  };
  const handleCloseDialog = () => {
    setDialogOpenStatus(false);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem alignItems="flex-start" className={classes.listHeader}>
      {/* Show notebook name */}
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
      {/* Show number of notes within this notebook */}
      <Typography
        component="span"
        variant="subtitle2"
        color="textSecondary"
        className={classes.headerSubtitle}
      >
        3 notes
      </Typography>
      {/* This is the utility button */}
      <IconButton className={classes.headerAction} onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      {/* This is the dropdown menu when we click the utility button on list header */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClickOpenDialog}>Move notebook</MenuItem>
        <MenuItem onClick={handleClose}>Share notebook</MenuItem>
        <MenuItem onClick={handleClose}>Share notebook</MenuItem>
      </Menu>
      {/* This is the dialog that will appear, which show list of all notebook we can move to */}
      <Dialog
        open={dialogOpenStatus}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">Move note to</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Find the location you want to move the file to or just click the one
            you want
          </DialogContentText>
          <TextField
            id="email"
            //autoFocus
            variant="outlined"
            size="small"
            label="Find the location"
            ///defaultValue="hello world"
            fullWidth
          />
          {/* Show list of all notebook to move to */}
          <List
            component="nav"
            aria-label="main"
            className={classes.dialogItemDisplay}
          >
            {/* This one item has subtitle as it show which notebook we are in now */}
            <ListItem button>
              <ListItemIcon>
                <SvgIcon>
                  <path
                    fill="currentColor"
                    d="M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7V5H5V4C5,2.89 5.9,2 7,2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M5,5V7H7V5H5M5,19H7V17H5V19M5,13H7V11H5V13Z"
                  />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography component="span" variant="body1">
                    Item title {"     "}
                  </Typography>
                }
                secondary={
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    (current)
                  </Typography>
                }
              />
            </ListItem>
            {/* Other item just show normal text */}
            <ListItem button>
              <ListItemIcon>
                <SvgIcon>
                  <path
                    fill="currentColor"
                    d="M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7V5H5V4C5,2.89 5.9,2 7,2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M5,5V7H7V5H5M5,19H7V17H5V19M5,13H7V11H5V13Z"
                  />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
        </DialogContent>
        {/* After we choose the place to move to we click the Move button */}
        <DialogActions>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseDialog}
            >
              Move
            </Button>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Cancel
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
      <Divider component="li" />
    </ListItem>
  );
}
