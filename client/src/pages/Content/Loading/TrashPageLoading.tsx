import React, { useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/type/globalType";
import { useHistory } from "react-router-dom";

export default function TrashPageLoading() {
  const allNotes = useSelector((store: StoreType) => store.notes);
  const loading = useSelector((store: StoreType) => store.loading);
  const history = useHistory();

  useEffect(() => {
    if (!loading.notesLoading) {
      const inTrashNote = allNotes.find((note) => note.inTrash);
      if (inTrashNote) {
        history.push("/main/trash/notes/" + inTrashNote.id);
      } else {
        // If there is no notes in trash render Trash page, blank version
        history.push("/main/trash/notes/blank");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allNotes, loading.notesLoading]);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}
