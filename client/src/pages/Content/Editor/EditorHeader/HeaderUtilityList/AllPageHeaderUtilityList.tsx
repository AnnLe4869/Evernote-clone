import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  moveNoteToTrash,
  updateInShortcutStatusNote,
} from "../../../../../redux/actions/noteAction";
import useNoteFromPath from "../../../../../utils/useNoteFromPath";
import MoveNoteHeaderDialog from "./MoveNoteHeaderDialog";

export default function AllPageHeaderUtilityList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpenStatus, setDialogOpenStatus] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { note: currentNote } = useNoteFromPath();

  const handleClickOpenUtilityList = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUtilityList = () => {
    setDialogOpenStatus(false);
    setAnchorEl(null);
  };

  const openDialog = () => {
    setDialogOpenStatus(true);
  };

  const toggleInShortcutStatus = () => {
    if (currentNote) {
      dispatch(
        updateInShortcutStatusNote(currentNote, !currentNote.inShortcut)
      );
    }
    setAnchorEl(null);
  };

  const moveToTrash = () => {
    if (currentNote) {
      dispatch(
        // The callback function run when all async action is finished
        moveNoteToTrash(currentNote, () => {
          history.push(`/main/notes`);
        })
      );
      setAnchorEl(null);
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
        <MenuItem onClick={openDialog}>Move ...</MenuItem>
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
        // When close dialog we also want to close utility list
        handleCloseDialog={handleCloseUtilityList}
      />
    </>
  );
}
