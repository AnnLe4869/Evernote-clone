import React, { useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/type/globalType";
import { useHistory } from "react-router-dom";

export default function AllNoteLoading() {
  const allNotes = useSelector((store: StoreType) => store.notes);
  const loading = useSelector((store: StoreType) => store.loading);
  const history = useHistory();
  useEffect(() => {
    if (!loading.notesLoading) {
      const notInTrashNote = allNotes.find((note) => !note.inTrash);
      history.push("/main/notes/" + notInTrashNote?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allNotes.length, loading.notesLoading]);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}
