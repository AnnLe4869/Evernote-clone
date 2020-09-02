import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllNotebooks } from "../../../redux/actions/notebookAction";
import { StoreType } from "../../../redux/type/globalType";

export default function NotebookList() {
  const dispatch = useDispatch();
  const notebooks = useSelector((state: StoreType) => state.notebooks);

  useEffect(() => {
    dispatch(fetchAllNotebooks());
  }, []);

  if (notebooks.length === 0) return <div>Loading</div>;

  return (
    <div>
      {notebooks.map((notebook) => (
        <Link to={`/notebooks/${notebook.id}`}>{notebook.name}</Link>
      ))}
    </div>
  );
}
