import React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function HeaderUtilityList() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickOpenUtilityList = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUtilityList = () => {
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
        <MenuItem onClick={handleCloseUtilityList}>Share notebook</MenuItem>
        <MenuItem onClick={handleCloseUtilityList}>Share notebook</MenuItem>
        <MenuItem onClick={handleCloseUtilityList}>Share notebook</MenuItem>
      </Menu>
    </>
  );
}
