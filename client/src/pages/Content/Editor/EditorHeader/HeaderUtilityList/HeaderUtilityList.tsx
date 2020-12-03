import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch } from "react-redux";
import { updateNote } from "../../../../../redux/actions/noteAction";
import useNoteFromId from "../../../../../utils/useNoteFromId";
import { useHistory } from "react-router-dom";
import useNotebookFromId from "../../../../../utils/useNotebookFromId";
import MoveNoteHeaderDialog from "./MoveNoteHeaderDialog";

export default function HeaderUtilityList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpenStatus, setDialogOpenStatus] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const currentNote = useNoteFromId();
  const { notebook: currentNotebook } = useNotebookFromId();

  const handleClickOpenUtilityList = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUtilityList = () => {
    setAnchorEl(null);
    openDialog();
  };

  const openDialog = () => {
    setDialogOpenStatus(true);
  };

  const closeDialog = () => {
    setDialogOpenStatus(false);
  };

  const toggleInShortcutStatus = () => {
    if (currentNote) {
      dispatch(
        updateNote({ ...currentNote, inShortcut: !currentNote.inShortcut })
      );
    }

    setAnchorEl(null);
  };

  const moveToTrash = () => {
    if (currentNote) {
      dispatch(updateNote({ ...currentNote, inTrash: true }));
      setAnchorEl(null);
      history.push(`/main/notebooks/${currentNotebook?.id}`);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpenUtilityList}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseUtilityList}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Move to other notebook */}
        <MenuItem onClick={handleCloseUtilityList}>Move ...</MenuItem>
        {/* Move or remove from shortcut list */}
        <MenuItem onClick={toggleInShortcutStatus}>
          {currentNote?.inShortcut
            ? "Remove from Shortcuts"
            : "Move to Shortcuts"}
        </MenuItem>
        {/* Move the note to trash */}
        <MenuItem onClick={moveToTrash}>Move to Trash</MenuItem>
      </Menu>

      <MoveNoteHeaderDialog
        dialogOpenStatus={dialogOpenStatus}
        handleCloseDialog={closeDialog}
      />
    </>
  );
}
