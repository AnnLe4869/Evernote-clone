import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  headerAction: {
    position: "absolute",
    right: theme.spacing(0),
    bottom: theme.spacing(0),
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  handleClickOpenDialog: () => void;
  anchorEl: any;
  setAnchorEl: (value: any) => void;
}

export default function ListHeaderUtility({
  handleClickOpenDialog,
  anchorEl,
  setAnchorEl,
}: Props) {
  const classes = useStyles();

  const handleClickOpenUtilityList = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUtilityList = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        className={classes.headerAction}
        onClick={handleClickOpenUtilityList}
      >
        <MoreHorizIcon />
      </IconButton>
      {/* This is the dropdown menu when we click the utility button on list header */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseUtilityList}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClickOpenDialog}>Move notebook</MenuItem>
        <MenuItem onClick={handleCloseUtilityList}>Share notebook</MenuItem>
        <MenuItem onClick={handleCloseUtilityList}>Share notebook</MenuItem>
      </Menu>
    </>
  );
}
