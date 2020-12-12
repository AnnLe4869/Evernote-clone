import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleNotebookInShortcutStatus } from "../../../redux/actions/notebookAction";
import { MY_HOME } from "../../../redux/constants/constants";
import { NotebookType } from "../../../redux/type/globalType";
import ChangeNameDialog from "./ChangeNameDialog";
import DeleteNotebookDialog from "./DeleteNotebookDialog";
import ShareNotebookDialog from "./ShareNotebookDialog";

interface Props {
  notebook: NotebookType;
}

export default function NotebookUtilityList(props: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const openUtilityList = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeUtilityList = () => {
    setAnchorEl(null);
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
      <IconButton onClick={openUtilityList}>
        <MoreVertIcon />
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
