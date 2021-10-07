import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import useNotebookFromPath from "../../../../utils/useNotebookFromPath";
import FilteredPageListHeaderFootnote from "./ListHeaderFootnote/FilteredPageListHeaderFootnote";
import ListHeaderTitle from "./ListHeaderTitle/FilteredPageListHeaderTitle";
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
  const { notebook } = useNotebookFromPath();

  if (!notebook) {
    return <div></div>;
  }

  return (
    <ListItem alignItems="flex-start" className={classes.listHeader}>
      {/* Show notebook name */}
      <ListHeaderTitle />

      {/* Show number of notes within this notebook */}
      <FilteredPageListHeaderFootnote />

      {/* Show some action we can do with the notebook */}
      <ListHeaderUtility notebook={notebook} />
    </ListItem>
  );
}
