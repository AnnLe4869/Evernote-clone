import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../redux/type/globalType";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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

  if (!user.displayName || !user.photoURL) {
    return <div></div>;
  }

  const handleOpenList = () => {
    console.log("hello");
  };

  return (
    <div className={classes.container} onClick={handleOpenList}>
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
    </div>
  );
}
