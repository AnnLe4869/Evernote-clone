import React, { useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/type/globalType";
import { useHistory } from "react-router-dom";

export default function AllNoteLoading() {
  const allNotes = useSelector((store: StoreType) => store.notes);
  const history = useHistory();
  useEffect(() => {
    if (allNotes.length > 0) history.push("/main/notes/" + allNotes[0].id);
  }, [allNotes.length]);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}
