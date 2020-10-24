import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addNewNotebook,
  fetchAllNotebooks,
} from "../../../redux/actions/notebookAction";
import { StoreType } from "../../../redux/type/globalType";

export default function NotebookList() {
  const notebooks = useSelector((state: StoreType) => state.notebooks);
  const dispatch = useDispatch();

  if (notebooks.length === 0) return <div>Loading</div>;

  const createNewNotebook = () => {
    dispatch(addNewNotebook("New notebook"));
  };

  return (
    <>
      <button onClick={createNewNotebook}>Add new notebook</button>
      <ul>
        {notebooks.map((notebook) => (
          <li key={notebook.id}>
            <Link to={`/main/notebooks/${notebook.id}/notes`}>
              {notebook.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
