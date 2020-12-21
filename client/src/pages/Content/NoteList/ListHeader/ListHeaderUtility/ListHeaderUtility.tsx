import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewNote } from "../../../../../redux/actions/noteAction";
import { toggleNotebookInShortcutStatus } from "../../../../../redux/actions/notebookAction";
import { MY_HOME } from "../../../../../redux/constants/constants";
import { NotebookType } from "../../../../../redux/type/globalType";
import ChangeNameDialog from "../../../NotebookList/Dialog/ChangeNameDialog";
import DeleteNotebookDialog from "../../../NotebookList/Dialog/DeleteNotebookDialog";
import ShareNotebookDialog from "../../../NotebookList/Dialog/ShareNotebookDialog";

const useStyles = makeStyles((theme) => ({
  headerAction: {
    position: "absolute",
    right: theme.spacing(0),
    bottom: theme.spacing(0),
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  notebook: NotebookType;
}

export default function ListHeaderUtility(props: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const openUtilityList = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeUtilityList = () => {
    setAnchorEl(null);
  };

  // Create a new note
  const createNewNote = () => {
    // After create new note run the callback
    dispatch(addNewNote(props.notebook, closeUtilityList));
  };

  // All the management for change name dialog
  const [changeNameDialogOpen, setChangeNameDialogOpen] = useState(false);
  const openChangeNameDialog = () => {
    // We close the utility list when the dialog open
    closeUtilityList();
    setChangeNameDialogOpen(true);
  };
  const closeChangeNameDialog = () => {
    setChangeNameDialogOpen(false);
  };

  // All the management for share notebook dialog
  const [shareNotebookDialog, setShareNotebookDialog] = useState(false);
  const openShareNotebookDialog = () => {
    // We close the utility list when the dialog open
    closeUtilityList();
    setShareNotebookDialog(true);
  };
  const closeShareNotebookDialog = () => {
    setShareNotebookDialog(false);
  };

  // All the management for share notebook dialog
  const [deleteNotebookDialog, setDeleteNotebookDialog] = useState(false);
  const openDeleteNotebookDialog = () => {
    // We close the utility list when the dialog open
    closeUtilityList();
    setDeleteNotebookDialog(true);
  };
  const closeDeleteNotebookDialog = () => {
    setDeleteNotebookDialog(false);
  };

  // Move notebook to Shortcuts
  const toggleNotebookInShortcutStatusHandler = () => {
    dispatch(toggleNotebookInShortcutStatus(props.notebook));
    closeUtilityList();
  };

  return (
    <>
      <IconButton onClick={openUtilityList} className={classes.headerAction}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeUtilityList}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Add new note */}
        <MenuItem onClick={createNewNote}>Add new note</MenuItem>
        {/* Rename notebook */}
        <MenuItem onClick={openChangeNameDialog}>Rename to notebook</MenuItem>
        {/* Move or remove from shortcut list */}
        <MenuItem onClick={toggleNotebookInShortcutStatusHandler}>
          {props.notebook.inShortcut
            ? "Remove to Shortcuts"
            : "Move to Shortcuts"}
        </MenuItem>
        {/* Share notebook */}
        <MenuItem onClick={openShareNotebookDialog}>Share notebook</MenuItem>
        {/* Move the note to trash, except for the default notebook MY_HOME */}
        <MenuItem
          onClick={openDeleteNotebookDialog}
          disabled={props.notebook.name === MY_HOME}
        >
          Delete notebook
        </MenuItem>
      </Menu>

      {/* Dialog for change name */}
      <ChangeNameDialog
        dialogOpen={changeNameDialogOpen}
        closeDialog={closeChangeNameDialog}
        notebook={props.notebook}
      />
      {/* Dialog for share notebook */}
      <ShareNotebookDialog
        dialogOpen={shareNotebookDialog}
        closeDialog={closeShareNotebookDialog}
        notebook={props.notebook}
      />
      {/* Dialog for remove the notebook */}
      <DeleteNotebookDialog
        dialogOpen={deleteNotebookDialog}
        closeDialog={closeDeleteNotebookDialog}
        notebook={props.notebook}
      />
    </>
  );
}
