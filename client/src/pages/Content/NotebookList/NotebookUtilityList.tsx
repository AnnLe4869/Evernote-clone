import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { NotebookType } from "../../../redux/type/globalType";
import ChangeNameDialog from "./ChangeNameDialog";
import DeleteNotebookDialog from "./DeleteNotebookDialog";
import ShareNotebookDialog from "./ShareNotebookDialog";

interface Props {
  notebook: NotebookType;
}

export default function NotebookUtilityList(props: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
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
        <MenuItem onClick={openChangeNameDialog}>Rename the notebook</MenuItem>
        {/* Move or remove from shortcut list */}
        <MenuItem>Move from Shortcuts</MenuItem>
        {/* Share notebook */}
        <MenuItem onClick={openShareNotebookDialog}>Share notebook</MenuItem>
        {/* Move the note to trash */}
        <MenuItem onClick={openDeleteNotebookDialog}>Delete notebook</MenuItem>
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
