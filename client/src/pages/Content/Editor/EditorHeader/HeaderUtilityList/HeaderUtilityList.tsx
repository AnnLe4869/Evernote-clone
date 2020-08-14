import React, { useEffect, useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { NoteType } from "../../../../../redux/type/type";
import { useDispatch } from "react-redux";
import { updateNote } from "../../../../../redux/actions/noteAction";

export default function HeaderUtilityList(props: NoteType) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentNote, setCurrentNote] = useState({
    id: "",
    creator: "",
    timestamp: "",
    content: "",
    title: "",
    shareWith: [{ user: "", canWrite: false }],
    inShortcut: false,
    inTrash: false,
  });

  const dispatch = useDispatch();

  // Because at first the content maybe undefined as useSelector hasn't run or data not yet available in store
  useEffect(() => {
    if (props.id) {
      setCurrentNote(props);
    }
  }, [props.id]);

  const handleClickOpenUtilityList = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUtilityList = () => {
    setAnchorEl(null);
  };

  const toggleInShortcutStatus = () => {
    dispatch(
      updateNote({ ...currentNote, inShortcut: !currentNote.inShortcut })
    );
    setAnchorEl(null);
  };

  const moveToTrash = () => {
    dispatch(updateNote({ ...currentNote, inTrash: true }));
    setAnchorEl(null);
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
        <MenuItem onClick={handleCloseUtilityList}>Move ...</MenuItem>
        <MenuItem onClick={toggleInShortcutStatus}>
          {currentNote.inShortcut
            ? "Remove from Shortcuts"
            : "Move to Shortcuts"}
        </MenuItem>
        <MenuItem onClick={moveToTrash}>Move to Trash</MenuItem>
      </Menu>
    </>
  );
}
