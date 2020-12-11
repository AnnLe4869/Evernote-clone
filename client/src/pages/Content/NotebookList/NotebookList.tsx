import {
  Button,
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreType } from "../../../redux/type/globalType";
import NewNotebookDialog from "./NewNotebookDialog";
import NotebookUtilityList from "./NotebookUtilityList";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  addNotebookButton: {
    float: "right",
  },
  tableHeader: {
    float: "left",
  },
}));

export default function NotebookList() {
  const notebooks = useSelector((state: StoreType) => state.notebooks);
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

  if (notebooks.length === 0) return <div>Loading</div>;

  return (
    <Container>
      {/* A tittle for the page */}
      <Typography
        className={classes.title}
        component="h1"
        variant="h5"
        color="inherit"
      >
        Notebooks
      </Typography>

      {/* Button for adding new notebook */}
      <Button
        className={classes.addNotebookButton}
        variant="outlined"
        color="primary"
        onClick={openDialog}
      >
        Add new notebook
      </Button>
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
                  <NotebookUtilityList notebook={notebook} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <NewNotebookDialog dialogOpen={dialogOpen} closeDialog={closeDialog} />
    </Container>
  );
}
