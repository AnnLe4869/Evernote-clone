import {
  Avatar,
  ClickAwayListener,
  Grid,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../../redux/type/globalType";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useRef } from "react";
import { logOut } from "../../../../redux/actions/authAction";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  container: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: "#ccc",
    "&:hover": {
      color: "white",
      cursor: "pointer",
    },
  },
  text: {
    paddingLeft: theme.spacing(1),
  },
}));

export default function AccountSetting() {
  const classes = useStyles();
  const user = useSelector((store: StoreType) => store.user);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    // This run when click on the item
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    // This run when click on other part beside the list of items
    setOpen(false);
  };

  const handleLogOut = (event: React.MouseEvent<EventTarget>) => {
    // This run when click on the item
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      dispatch(logOut());
      return;
    }
    // This run when click on other part beside the list of items
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  if (!user.displayName || !user.photoURL) {
    return <div></div>;
  }

  return (
    <div
      className={classes.container}
      ref={anchorRef}
      aria-controls={open ? "menu-list-grow" : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      <Grid container alignItems="center">
        <Grid item xs={2} md={2} lg={2}>
          <Avatar
            alt={user.displayName}
            src={user.photoURL}
            className={classes.icon}
          />
        </Grid>

        <Grid
          item
          container
          xs={10}
          md={10}
          lg={10}
          alignItems="center"
          className={classes.text}
        >
          <Grid item>
            <Typography>{user.displayName}</Typography>
          </Grid>
          <Grid item>
            <ArrowDropDownIcon />
          </Grid>
        </Grid>
      </Grid>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        style={{ zIndex: 100 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
