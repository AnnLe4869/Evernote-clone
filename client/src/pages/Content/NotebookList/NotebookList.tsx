import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addNewNotebook } from "../../../redux/actions/notebookAction";
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

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Updated</TableCell>
              <TableCell align="right">Shared with</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notebooks.map((notebook) => (
              <TableRow key={notebook.name} hover>
                <TableCell component="th" scope="row">
                  <Link to={`/main/notebooks/${notebook.id}/notes`}>
                    {notebook.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{notebook.creator}</TableCell>
                <TableCell align="right">{notebook.timestamp}</TableCell>
                <TableCell align="right">None</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary">
                    Click
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
