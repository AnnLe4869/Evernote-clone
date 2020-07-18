import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "6rem",
    boxShadow: "none",
  },
  headerExpandIcon: {
    marginLeft: theme.spacing(1),
  },
  headerDivider: {
    height: "1.5rem",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  headerNotebookIcon: {
    fontSize: 18,
    verticalAlign: "100px",
    marginRight: theme.spacing(0.5),
  },
  headerUtility: {
    position: "absolute",
    right: theme.spacing(0),
    top: theme.spacing(0),
    marginRight: theme.spacing(1),
  },
  headerFootnote: {
    marginLeft: theme.spacing(2),
    position: "relative",
    left: theme.spacing(0),
    top: theme.spacing(2),
  },
  editor: {
    height: "100vh",
    background: "green",
  },
  editorContentWrite: {
    height: "100%",
    background: "blue",
  },
  editorContentRead: {
    height: "100%",
  },
}));

// For the Share button
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function Editor({ setExpandStatus }) {
  const classes = useStyles();
  const [text, setText] = useState("hello");
  const [focusStatus, setFocusStatus] = useState(false);
  const [dialogOpenStatus, setDialogOpenStatus] = useState(false);
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpenStatus(true);
  };

  const handleCloseDialog = () => {
    setDialogOpenStatus(false);
  };

  const handleClickAway = () => {
    if (focusStatus) setFocusStatus(false);
  };
  const handleFocusIn = () => {
    if (!focusStatus) setFocusStatus(true);
  };

  const handleChange = (value) => setText(value);

  return (
    <div>
      {/* The header of the editor */}
      <Paper className={classes.header} square>
        {/* Top part of the header */}
        <Grid
          item
          container
          md={6}
          spacing={1}
          alignContent="center"
          alignItems="center"
        >
          <IconButton
            className={classes.headerExpandIcon}
            onClick={setExpandStatus}
          >
            <SvgIcon>
              <path
                fill-rule="currentColor"
                d="M6.031 3a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3V6a3 3 0 00-3-3h-11zm4.47 4.289H8.184l2.915 2.914a.625.625 0 01-.884.884L7.3 8.172v2.319a.625.625 0 11-1.25 0V6.674c0-.351.285-.635.635-.635h3.818a.625.625 0 010 1.25zM12.6 15.76h2.318l-2.915-2.915a.625.625 0 11.884-.884l2.915 2.915V12.56a.625.625 0 011.25 0v3.817c0 .35-.285.635-.635.635H12.6a.625.625 0 110-1.25z"
              ></path>
            </SvgIcon>
          </IconButton>
          <Divider orientation="vertical" className={classes.headerDivider} />
          <SvgIcon className={classes.headerNotebookIcon}>
            <path
              fill="currentColor"
              d="M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7V5H5V4C5,2.89 5.9,2 7,2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M5,5V7H7V5H5M5,19H7V17H5V19M5,13H7V11H5V13Z"
            />
          </SvgIcon>
          <Typography
            component="h5"
            color="textSecondary"
            variant="subtitle2"
            display="inline"
          >
            Notebook title
          </Typography>

          <div className={classes.headerUtility}>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleClickOpenDialog}
              >
                Share
              </Button>
            </ThemeProvider>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            {/* This is the dialog that appear when we click the Share button */}
            <Dialog
              open={dialogOpenStatus}
              onClose={handleCloseDialog}
              aria-labelledby="form-dialog-title"
              maxWidth="sm"
            >
              <DialogTitle id="form-dialog-title">Share note name</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Write the email of the people you want to view or edit the
                  note.Write the email of the people you want to view or edit
                  the note
                </DialogContentText>
                <Grid container spacing={1}>
                  <Grid item md={8}>
                    <TextField
                      id="email"
                      autoFocus
                      fullWidth
                      value="email"
                      type="email"
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      id="isAllowEdit"
                      select
                      fullWidth
                      value={isAllowEdit}
                      onChange={(e) => setIsAllowEdit(e.target.value)}
                    >
                      <MenuItem key={true} value={true}>
                        Can view and edit
                      </MenuItem>
                      <MenuItem key={false} value={false}>
                        Can view only
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCloseDialog}
                  >
                    Send
                  </Button>
                </ThemeProvider>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
        {/* Bottom part of the header */}
        <Typography
          component="h5"
          color="textSecondary"
          variant="subtitle2"
          display="block"
          className={classes.headerFootnote}
        >
          last edit on 07/07/2020
        </Typography>
      </Paper>

      {/* The actual editor part */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper className={classes.editor} onClick={handleFocusIn}>
          {focusStatus ? (
            <ReactQuill
              className={classes.editorContentWrite}
              value={text}
              onChange={handleChange}
            />
          ) : (
            <ReactQuill
              className={classes.editorContentRead}
              value={text}
              readOnly
              theme="bubble"
            />
          )}
        </Paper>
      </ClickAwayListener>
    </div>
  );
}
