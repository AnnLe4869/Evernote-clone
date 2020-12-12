import firebase from "firebase";
import { Dispatch } from "redux";
import {
  ADD_NOTEBOOK,
  DELETE_MULTIPLE_NOTES,
  DELETE_NOTEBOOK,
  GET_ALL_NOTEBOOKS,
  UPDATE_MULTIPLE_NOTES,
  UPDATE_NOTEBOOK,
} from "../constants/constants";
import { NotebookType, NoteType, StoreType } from "../type/globalType";
import { setNotebookLoadingStatus } from "./loadingAction";
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
    // Start the loading
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
    // Start the loading
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

// This will permanently delete the notebook and all notes inside it
// Cannot recover the notes
export const completeDeleteNotebook = (notebook: NotebookType) => async (
  dispatch: Dispatch
): Promise<any> => {
  try {
    // Start the loading
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();
    // Create batch to send multiple operations at once
    const batch = db.batch();

    // Delete the notebook permanently
    const notebookRef = db.collection("notebooks").doc(notebook.id);
    batch.delete(notebookRef);

    // Loop through and Permanently delete all notes that are in the notebook
    notebook.notes.forEach((note) => {
      const noteRef = db.collection("notes").doc(note);
      batch.delete(noteRef);
    });

    // Commit the batch
    await batch.commit();

    // Dispatch the delete notebook action
    dispatch({
      type: DELETE_NOTEBOOK,
      deletedNotebook: notebook,
    });
    // Dispatch the delete multiple notes action
    dispatch({
      type: DELETE_MULTIPLE_NOTES,
      deletedNotes: notebook.notes,
    });
    dispatch(setNotebookLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

// This delete the notebook and move all notes to Trash
// Notes can be recovered
export const partialDeleteNotebook = (notebook: NotebookType) => async (
  dispatch: Dispatch<any>,
  getState: () => StoreType
): Promise<any> => {
  try {
    // Start the loading
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();

    // Create batch
    const batch = db.batch();

    // Delete the notebook permanently
    const notebookRef = db.collection("notebooks").doc(notebook.id);
    batch.delete(notebookRef);

    /**
     * Move multiple notes to Trash
     */

    // Get all the notes from redux store
    const { notes } = getState();
    // An array of notes that is updated
    const updatedNotes: NoteType[] = [];
    notebook.notes.forEach((noteId) => {
      const noteRef = db.collection("notes").doc(noteId);
      // Find the note that is belonged to the notebook
      let note = notes.find((note) => note.id === noteId);
      // If the ID in notebook doesn't match up with any notes in store, throw error
      if (!note) {
        throw new Error(
          "Cannot find the note in redux store. Something went wrong"
        );
      }

      // Update the note
      note = {
        ...note,
        inTrash: true,
      };

      // Push the note to the note list
      updatedNotes.push(note);
      // Create the update action in batch
      batch.update(noteRef, {
        inTrash: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    });

    // Commit the batch operations
    await batch.commit();
    // Dispatch the delete notebook action
    dispatch({
      type: DELETE_NOTEBOOK,
      deletedNotebook: notebook,
    });
    dispatch({
      type: UPDATE_MULTIPLE_NOTES,
      updatedNotes,
    });

    dispatch(setNotebookLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

// This move all the notes inside the notebook to Shortcuts
export const moveNotebookToShortcut = (notebook: NotebookType) => async (
  dispatch: Dispatch<any>,
  getState: () => StoreType
): Promise<any> => {
  try {
    // Start the loading
    dispatch(setNotebookLoadingStatus(true));
    const db = firebase.firestore();

    // Create batch
    const batch = db.batch();

    // Update the notebook inShortcut status
    const notebookRef = db.collection("notebooks").doc(notebook.id);
    batch.update(notebookRef, {
      inShortcut: true,
    });
    /**
     * Change the inShortcut status of all notes it has to true
     */

    // Get all the notes from redux store
    const { notes } = getState();
    // An array of notes that is updated
    const updatedNotes: NoteType[] = [];

    notebook.notes.forEach((noteId) => {
      const noteRef = db.collection("notes").doc(noteId);
      let note = notes.find((note) => note.id === noteId);
      // Find the note that is belonged to the notebook
      if (!note)
        throw new Error(
          "Cannot find the note in redux store. Something went wrong"
        );

      // Update the note
      note = {
        ...note,
        inShortcut: true,
      };

      // Push the note to the note list
      updatedNotes.push(note);
      // Create the update action in batch
      batch.update(noteRef, {
        inShortcut: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    });

    // Commit the batch operation
    await batch.commit();

    // Dispatch the change of notes and notebook
    dispatch({
      type: UPDATE_MULTIPLE_NOTES,
      updatedNotes,
    });
    dispatch({
      type: UPDATE_NOTEBOOK,
      updatedNotebook: {
        ...notebook,
        inShortcut: true,
      },
    });

    dispatch(setNotebookLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};
