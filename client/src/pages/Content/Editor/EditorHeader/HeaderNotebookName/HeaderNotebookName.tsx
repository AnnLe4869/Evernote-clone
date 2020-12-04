import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import useNotebookFromNote from "../../../../../utils/useNotebookFromNote";

const useStyles = makeStyles((theme) => ({
  headerNotebookIcon: {
    fontSize: 18,
    verticalAlign: "100px",
    marginRight: theme.spacing(0.5),
  },
  headerDivider: {
    height: "1.5rem",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));

export default function HeaderNotebookName() {
  const classes = useStyles();
  const { notebook } = useNotebookFromNote();

  return (
    <>
      <Divider orientation="vertical" className={classes.headerDivider} />

      <SvgIcon className={classes.headerNotebookIcon}>
        <path
          fill="currentColor"
          d="M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7V5H5V4C5,2.89 5.9,2 7,2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M5,5V7H7V5H5M5,19H7V17H5V19M5,13H7V11H5V13Z"
        />
      </SvgIcon>
      <Typography
        component="h5"
        color="textSecondary"
        variant="subtitle2"
        display="inline"
      >
        {notebook.name}
      </Typography>
    </>
  );
}
