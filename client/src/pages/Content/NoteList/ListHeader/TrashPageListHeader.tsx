import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import TrashPageListHeaderFootnote from "./ListHeaderFootnote/TrashPageListHeaderFootnote";
import ListHeaderTitle from "./ListHeaderTitle/TrashPageListHeaderTitle";

const useStyles = makeStyles(() => ({
  listHeader: {
    height: "8rem",
    position: "relative",
    borderBottom: "#e6e6e6 1px solid",
  },
}));

export default function TrashPageListHeader() {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" className={classes.listHeader}>
      {/* Show notebook name */}
      <ListHeaderTitle />

      {/* Show number of notes within this notebook */}
      <TrashPageListHeaderFootnote />
    </ListItem>
  );
}
