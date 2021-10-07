import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import HeaderExpandButton from "./HeaderExpandButton/HeaderExpandButton";
import HeaderFootnote from "./HeaderFootnote/HeaderFootnote";
import TrashPageHeaderNotebookName from "./HeaderNotebookName/TrashPageHeaderNotebookName";
import HeaderShareButton from "./HeaderShareButton/HeaderShareButton";
import TrashPageHeaderUtilityList from "./HeaderUtilityList/TrashPageHeaderUtilityList";

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

export default function TrashPageEditorHeader(props: Props) {
  const classes = useStyles();
  const { setExpandStatus } = props;

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
        <TrashPageHeaderNotebookName />

        <div className={classes.headerUtility}>
          {/* Share button */}
          <HeaderShareButton />

          {/* This is the button to show utility list and utility list itself */}
          <TrashPageHeaderUtilityList />
        </div>
      </Grid>
      {/* Bottom part of the header */}
      <HeaderFootnote />
    </Paper>
  );
}
