import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllNotebooks } from "../../../redux/actions/notebookAction";
import { StoreType } from "../../../redux/type/globalType";

export default function NotebookList() {
  const notebooks = useSelector((state: StoreType) => state.notebooks);

  

  if (notebooks.length === 0) return <div>Loading</div>;

  return (
    <ul>
      {notebooks.map((notebook) => (
        <li>
          <Link to={`/main/notebooks/${notebook.id}/notes`}>
            
            
            {notebook.name}
          
          
          </Link>
        </li>
      ))}
    </ul>
  );
}
