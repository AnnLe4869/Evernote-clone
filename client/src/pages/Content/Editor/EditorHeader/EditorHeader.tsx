import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import HeaderExpandButton from "./HeaderExpandButton/HeaderExpandButton";
import HeaderNotebookName from "./HeaderNotebookName/HeaderNotebookName";
import HeaderShareButton from "./HeaderShareButton/HeaderShareButton";
import HeaderUtilityList from "./HeaderUtilityList/HeaderUtilityList";
import HeaderDialog from "./HeaderDialog/HeaderDialog";
import HeaderFootnote from "./HeaderFootnote/HeaderFootnote";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "6rem",
    boxShadow: "none",
  },

  headerUtility: {
    position: "absolute",
    right: theme.spacing(0),
    top: theme.spacing(0),
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  setExpandStatus: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function EditorHeader(props: Props) {
  const classes = useStyles();
  const { setExpandStatus } = props;
  const [dialogOpenStatus, setDialogOpenStatus] = useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpenStatus(true);
  };

  const handleCloseDialog = () => {
    setDialogOpenStatus(false);
  };

  return (
    <Paper className={classes.header} square>
      {/* Top part of the header */}
      <Grid
        item
        container
        md={6}
        spacing={1}
        alignContent="center"
        alignItems="center"
      >
        {/* Expand button */}
        <HeaderExpandButton setExpandStatus={setExpandStatus} />

        {/* Show the notebook name */}
        <HeaderNotebookName />

        <div className={classes.headerUtility}>
          {/* Share button */}
          <HeaderShareButton handleClickOpenDialog={handleClickOpenDialog} />

          {/* This is the button to show utility list and utility list itself */}
          <HeaderUtilityList />

          {/* This is the dialog that appear when we click the Share button */}
          <HeaderDialog
            dialogOpenStatus={dialogOpenStatus}
            handleCloseDialog={handleCloseDialog}
          />
        </div>
      </Grid>
      {/* Bottom part of the header */}
      <HeaderFootnote />
    </Paper>
  );
}
