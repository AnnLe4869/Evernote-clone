import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ParamType, StoreType } from "../redux/type/globalType";

export default function useNotebookFromId() {
  const { notebookId } = useParams<ParamType>();
  const allNotebooks = useSelector((store: StoreType) => store.notes);

  if (!allNotebooks.find((notebook) => notebook.id === notebookId)) {
    throw new Error(
      "Cannot find the notebooks. Maybe the hook is used in wrong place"
    );
  }

  return allNotebooks.find((notebook) => notebook.id === notebookId);
}