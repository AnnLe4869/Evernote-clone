import firebase from "firebase";
import { Dispatch } from "redux";
import { setNotebookLoadingStatus } from "./loadingAction";
import {
  GET_ALL_NOTEBOOKS,
  ADD_NOTEBOOK,
  UPDATE_NOTEBOOK,
} from "../constants/constants";
import { NoteType, StoreType, NotebookType } from "../type/globalType";
import { addNewNote } from "./noteAction";

export const fetchAllNotebooks = () => async (
  dispatch: Dispatch,
  getState: () => StoreType
): Promise<any> => {
  // Get the user's id
  const { user } = getState();
  try {
    // Change the loading status to true
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();
    const querySnapshots = await db
      .collection("notebooks")
      .where("creator", "==", user.id)
      .get();
    const allNotebooks: any = [];
    // Fetch item's data and id
    querySnapshots.forEach((doc) => {
      const { timestamp } = doc.data();
      allNotebooks.push({
        ...doc.data(),
        id: doc.id,
        timestamp: timestamp.toDate().toLocaleTimeString(),
      });
    });
    // Dispatch the data to reducer
    dispatch({
      type: GET_ALL_NOTEBOOKS,
      allNotebooks: allNotebooks,
    });
    // Change the loading status to false
    dispatch(setNotebookLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const addNewNotebook = (name: string) => async (
  dispatch: Dispatch<any>,
  getState: () => StoreType
): Promise<any> => {
  // Get the user's id and existing notebooks
  const { user, notebooks } = getState();

  try {
    // Only add new notebook if a notebook of same name hasn't existed yet
    if (!notebooks.find((notebook) => notebook.name === name)) {
      // Set the loading status to true
      dispatch(setNotebookLoadingStatus(true));

      // Only then we start the process
      const db = firebase.firestore();
      let newNotebook = {
        name,
        creator: user.id,
        notes: [],
        shareWith: [],
        inShortcut: false,
        inTrash: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const notebookRef = await db.collection("notebooks").add(newNotebook);
      const doc: any = (await notebookRef.get()).data();

      const newNotebookAdded: NotebookType = {
        ...newNotebook,
        id: notebookRef.id,
        timestamp: doc.timestamp.toDate().toLocaleTimeString(),
      };

      // First dispatch the new notebook to the reducer
      dispatch({
        type: ADD_NOTEBOOK,
        addedNotebook: newNotebookAdded,
      });

      // Then create a new blank note inside this notebook
      dispatch(addNewNote(newNotebookAdded));

      // After all finished set the loading status to false
      dispatch(setNotebookLoadingStatus(false));
    }
  } catch (err) {
    console.error(err);
  }
};

export const addNoteToNotebook = (
  note: NoteType,
  notebook: NotebookType
) => async (dispatch: Dispatch): Promise<any> => {
  try {
    // Set the loading status to true
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();
    await db
      .collection("notebooks")
      .doc(notebook.id)
      .update({
        // Add the note id to the notebook
        notes: firebase.firestore.FieldValue.arrayUnion(note.id),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    // Create an updated version of the notebook
    const updatedNotebook = {
      ...notebook,
      notes: [...notebook.notes, note.id],
    };
    // Update on the store
    dispatch({
      type: UPDATE_NOTEBOOK,
      updatedNotebook: updatedNotebook,
    });
    // Set the loading status to false
    dispatch(setNotebookLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const removeNoteFromNotebook = (
  note: NoteType,
  notebook: NotebookType
) => async (dispatch: Dispatch): Promise<any> => {
  try {
    // Display the loading
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();
    await db
      .collection("notebooks")
      .doc(notebook.id)
      .update({
        notes: firebase.firestore.FieldValue.arrayRemove(note.id),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    // Create an updated version of the notebook
    const updatedNotebook = {
      ...notebook,
      // Do an inline function call. Need to refactor later
      notes: (() => {
        const oldNoteList = [...notebook.notes];
        const noteIndex = oldNoteList.indexOf(note.id);
        if (noteIndex > -1) {
          oldNoteList.splice(noteIndex, 1);
        }
        return oldNoteList;
      })(),
    };
    dispatch({
      type: UPDATE_NOTEBOOK,
      updatedNotebook: updatedNotebook,
    });
    dispatch(setNotebookLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const changeNotebookName = (
  notebook: NotebookType,
  newName: string
) => async (dispatch: Dispatch): Promise<any> => {
  try {
    // Display the loading
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();
    await db.collection("notebooks").doc(notebook.id).update({
      name: newName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // Create an updated version of the notebook
    const updatedNotebook = {
      ...notebook,
      name: newName,
    };
    dispatch({
      type: UPDATE_NOTEBOOK,
      updatedNotebook: updatedNotebook,
    });
    dispatch(setNotebookLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const moveNotebookToTrash = (note: NoteType) => async (
  dispatch: Dispatch
  //getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  try {
    // Display the loading
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();
    const { inTrash } = note;

    await db.collection("notebooks").doc(note.id).update({
      inTrash,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(setNotebookLoadingStatus(false));
    dispatch({
      type: UPDATE_NOTEBOOK,

      updatedNote: note,
    });
  } catch (err) {
    console.error(err);
  }
};
