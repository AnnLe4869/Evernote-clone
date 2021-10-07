import firebase from "firebase";
import { batch as reduxBatch } from "react-redux"; // To combine multiple dispatch into one
import { Dispatch } from "redux";
import {
  ADD_NOTE,
  ADD_NOTEBOOK,
  DELETE_MULTIPLE_NOTES,
  DELETE_NOTEBOOK,
  GET_ALL_NOTEBOOKS,
  MY_HOME,
  UPDATE_MULTIPLE_NOTES,
  UPDATE_NOTEBOOK,
} from "../constants/constants";
import { NotebookType, NoteType, StoreType } from "../type/globalType";
import { setNotebookLoadingStatus } from "./loadingAction";

export const fetchAllNotebooks = (callback = () => {}) => async (
  dispatch: Dispatch<any>,
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

    // First fetch always default created MY_HOME notebook if it's not exist yet
    const homeNotebook = allNotebooks.find(
      (notebook: { name: string }) => notebook.name === MY_HOME
    );
    if (!homeNotebook) {
      dispatch(addNewNotebook(MY_HOME));
    }

    // Change the loading status to false
    dispatch(setNotebookLoadingStatus(false));

    // After all the operation, execute the optional callback
    callback();
  } catch (err) {
    console.error(err);
  }
};

export const addNewNotebook = (name: string, callback = () => {}) => async (
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

      const db = firebase.firestore();
      // Create batch to send multiple operations at once
      const batch = db.batch();

      // Always create a new note in the notebook
      let newNote = {
        creator: user.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: "<h1>Title</h1><p><br></p><p>Note...</p>",
        title: "",
        shareWith: [],
        inShortcut: false,
        inTrash: false,
      };
      // Get the noteId
      const noteRef = db.collection("notes").doc();
      batch.set(noteRef, newNote);
      // The note that go to redux store
      const newAddedNote: NoteType = {
        ...newNote,
        id: noteRef.id,
        timestamp: new Date().toLocaleTimeString(),
      };

      let newNotebook = {
        name,
        creator: user.id,
        notes: [noteRef.id],
        shareWith: [],
        inShortcut: false,
        inTrash: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const notebookRef = db.collection("notebooks").doc();
      batch.set(notebookRef, newNotebook);
      const newNotebookAdded: NotebookType = {
        ...newNotebook,
        id: notebookRef.id,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Send the batch to firestore
      await batch.commit();

      reduxBatch(() => {
        // First dispatch the new notebook to the reducer
        dispatch({
          type: ADD_NOTEBOOK,
          addedNotebook: newNotebookAdded,
        });
        dispatch({
          type: ADD_NOTE,
          addedNote: newAddedNote,
        });

        // After all finished set the loading status to false
        dispatch(setNotebookLoadingStatus(false));

        // After all the operation, execute the optional callback
        callback();
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const addNoteToNotebook = (
  note: NoteType,
  notebook: NotebookType,
  callback = () => {}
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

    reduxBatch(() => {
      // Update on the store
      dispatch({
        type: UPDATE_NOTEBOOK,
        updatedNotebook: updatedNotebook,
      });
      // Set the loading status to false
      dispatch(setNotebookLoadingStatus(false));

      // After all the operation, execute the optional callback
      callback();
    });
  } catch (err) {
    console.error(err);
  }
};

export const removeNoteFromNotebook = (
  note: NoteType,
  notebook: NotebookType,
  callback = () => {}
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

    reduxBatch(() => {
      dispatch({
        type: UPDATE_NOTEBOOK,
        updatedNotebook: updatedNotebook,
      });
      dispatch(setNotebookLoadingStatus(false));

      // After all the operation, execute the optional callback
      callback();
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeNotebookName = (
  notebook: NotebookType,
  newName: string,
  callback = () => {}
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

    // After all the operation, execute the optional callback
    callback();
  } catch (err) {
    console.error(err);
  }
};

// This will permanently delete the notebook and all notes inside it
// Cannot recover the notes
export const completeDeleteNotebook = (
  notebook: NotebookType,
  callback = () => {}
) => async (dispatch: Dispatch): Promise<any> => {
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

    // After all the operation, execute the optional callback
    callback();
  } catch (err) {
    console.error(err);
  }
};

// This delete the notebook and move all notes to Trash
// Notes can be recovered
export const partialDeleteNotebook = (
  notebook: NotebookType,
  callback = () => {}
) => async (
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

    // After all the operation, execute the optional callback
    callback();
  } catch (err) {
    console.error(err);
  }
};

// This move or remove all the notes inside the notebook to Shortcuts
export const toggleNotebookInShortcutStatus = (
  notebook: NotebookType,
  callback = () => {}
) => async (
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
      inShortcut: !notebook.inShortcut,
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
      // Note that is in Shortcuts before the Notebook get into Shortcuts also get removed altogether
      note = {
        ...note,
        inShortcut: !notebook.inShortcut,
      };

      // Push the note to the note list
      updatedNotes.push(note);
      // Create the update action in batch
      batch.update(noteRef, {
        inShortcut: !notebook.inShortcut,
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
        inShortcut: !notebook.inShortcut,
      },
    });

    dispatch(setNotebookLoadingStatus(false));

    // After all the operation, execute the optional callback
    callback();
  } catch (err) {
    console.error(err);
  }
};
