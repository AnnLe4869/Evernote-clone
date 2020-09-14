import React, { useEffect, useMemo } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { ParamType, StoreType } from "../../../redux/type/globalType";
export default function FilterNoteLoading() {
  const { notebookId } = useParams<ParamType>();
  const history = useHistory();

  const allNotes = useSelector((store: StoreType) => store.notes);
  const allNotebooks = useSelector((store: StoreType) => store.notebooks);

  const selectedNotebook = useMemo(
    () => allNotebooks.find((notebook) => notebook.id === notebookId),
    [notebookId]
  );
  const defaultNote = useMemo(
    () => allNotes.find((note) => selectedNotebook?.notes.includes(note.id)),
    [notebookId]
  );

  useEffect(() => {
    if (!defaultNote) return;
    history.push(`/main/notebooks/${notebookId}/notes/${defaultNote.id}`);
  }, [notebookId]);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}
