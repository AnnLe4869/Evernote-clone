import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";

import ListHeaderDialog from "./ListHeaderDialog/ListHeaderDialog";
import ListHeaderTitle from "./ListHeaderTitle/FilteredPageListHeaderTitle";
import ListHeaderFootnote from "./ListHeaderFootnote/ListHeaderFootnote";
import ListHeaderUtility from "./ListHeaderUtility/ListHeaderUtility";

const useStyles = makeStyles(() => ({
  listHeader: {
    height: "8rem",
    position: "relative",
    borderBottom: "#e6e6e6 1px solid",
  },
}));

export default function FilteredPageListHeader() {
  const classes = useStyles();
  const [dialogOpenStatus, setDialogOpenStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpenDialog = () => {
    setDialogOpenStatus(true);
  };
  const handleCloseDialog = () => {
    setDialogOpenStatus(false);
    setAnchorEl(null);
  };

  return (
    <ListItem alignItems="flex-start" className={classes.listHeader}>
      {/* Show notebook name */}
      <ListHeaderTitle />

      {/* Show number of notes within this notebook */}
      <ListHeaderFootnote />

      {/* This is the utility button and the menu that pop up when click the button*/}
      <ListHeaderUtility
        handleClickOpenDialog={handleClickOpenDialog}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
      />
      {/* This is the dialog that will appear, which show list of all notebook we can move to */}
      <ListHeaderDialog
        dialogOpenStatus={dialogOpenStatus}
        handleCloseDialog={handleCloseDialog}
      />
    </ListItem>
  );
}
