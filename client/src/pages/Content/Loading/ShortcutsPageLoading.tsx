import React, { useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/type/globalType";
import { useHistory } from "react-router-dom";

export default function ShortcutsPageLoading() {
  const allNotes = useSelector((store: StoreType) => store.notes);
  const loading = useSelector((store: StoreType) => store.loading);
  const history = useHistory();
  useEffect(() => {
    if (!loading.notesLoading) {
      const inShortcutsNote = allNotes.find(
        (note) => !note.inTrash && note.inShortcut
      );
      if (inShortcutsNote) {
        history.push("/main/shortcuts/notes/" + inShortcutsNote.id);
      } else {
        // If there is no notes in shortcuts render the Shortcuts page blank version
        history.push("/main/shortcuts/notes/blank");
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
