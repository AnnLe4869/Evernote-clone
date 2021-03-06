import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { restoreNote } from "../../../../../redux/actions/noteAction";
import useNoteFromPath from "../../../../../utils/useNoteFromPath";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

export default function TrashPageHeaderUtilityList() {
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

  const handleRestoreNote = () => {
    if (currentNote) {
      setAnchorEl(null);
      dispatch(
        // The callback function run when all async action is finished
        restoreNote(currentNote, () => {
          history.push(`/main/trash/notes`);
        })
      );
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
        <MenuItem onClick={openDialog}>Delete permanently</MenuItem>

        {/* Move the note to trash */}
        <MenuItem onClick={handleRestoreNote}>Restore note</MenuItem>
      </Menu>

      <DeleteConfirmDialog
        dialogOpenStatus={dialogOpenStatus}
        // When close dialog we also want to close utility list
        handleCloseDialog={handleCloseUtilityList}
      />
    </>
  );
}
