import firebase from "firebase";
import { Dispatch } from "redux";
import {
  ADD_NOTE,
  DELETE_NOTE,
  GET_ALL_NOTES,
  MY_HOME,
  UPDATE_NOTE,
} from "../constants/constants";
import { NotebookType, NoteType, StoreType } from "../type/globalType";
import { setNotesLoadingStatus } from "./loadingAction";
import { addNoteToNotebook } from "./notebookAction";

export const fetchAllNotes = () => async (
  dispatch: Dispatch,
  getState: () => StoreType
): Promise<void> => {
  // Change the loading status to true
  dispatch(setNotesLoadingStatus(true));
  // Get the user's id
  const { user } = getState();
  try {
    const db = firebase.firestore();
    const querySnapshots = await db
      .collection("notes")
      .where("creator", "==", user.id)
      .get();
    const allNotes: any = [];
    // Fetch item's data and id
    querySnapshots.forEach((doc) => {
      const { timestamp } = doc.data();
      allNotes.push({
        ...doc.data(),
        id: doc.id,
        timestamp: timestamp.toDate().toLocaleTimeString(),
      });
    });
    // Dispatch the data to reducer
    dispatch({
      type: GET_ALL_NOTES,
      allNotes: allNotes,
    });
    // Change the loading status to false
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const addNewNote = (notebook: NotebookType) => async (
  dispatch: Dispatch<any>,
  getState: () => StoreType
): Promise<any> => {
  // Display the loading
  dispatch(setNotesLoadingStatus(true));
  // Get the user's id
  const { user } = getState();
  try {
    const db = firebase.firestore();
    let newNote = {
      creator: user.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      content: "    ",
      title: "nothing for now",
      shareWith: [],
      // If the notebook it's in are in shortcut, so does it
      inShortcut: notebook.inShortcut,
      inTrash: false,
    };
    // This is to get the the note id from firebase
    const noteRef = await db.collection("notes").add(newNote);
    // This is to get the latest data of the note from firebase
    const doc = (await noteRef.get()).data();
    const addedNote = {
      ...newNote,
      ...doc,
      id: noteRef.id,
      timestamp: doc?.timestamp.toDate().toLocaleTimeString(),
    };

    // Create a new note in the store
    dispatch({
      type: ADD_NOTE,
      addedNote: addedNote,
    });
    // Then add the note to notebook
    // Note that, Because technically speaking Dispatch alone require the inside function return an action, not another function
    // The dispatch: Dispatch require Action as return value whereas useDispatch() use any as return
    // Change dispatch: Dispatch<any> will make the dispatch() function accept any as returned value
    dispatch(addNoteToNotebook(addedNote, notebook));
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const updateNoteContent = (content: string, note: NoteType) => async (
  dispatch: Dispatch
): Promise<any> => {
  try {
    // Start the loading
    dispatch(setNotesLoadingStatus(true));
    const db = firebase.firestore();
    await db.collection("notes").doc(note.id).update({
      content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: { ...note, content },
    });
    // End the loading
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const updateInShortcutStatusNote = (
  note: NoteType,
  status: boolean
) => async (dispatch: Dispatch): Promise<any> => {
  try {
    // Start the loading
    dispatch(setNotesLoadingStatus(true));
    const db = firebase.firestore();
    await db.collection("notes").doc(note.id).update({
      inShortcut: status,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: { ...note, inShortcut: status },
    });
    // End the loading
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

// This move single note to trash
export const moveNoteToTrash = (note: NoteType) => async (
  dispatch: Dispatch
): Promise<any> => {
  try {
    // Start the loading
    dispatch(setNotesLoadingStatus(true));
    const db = firebase.firestore();

    await db.collection("notes").doc(note.id).update({
      inTrash: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: { ...note, inTrash: true },
    });
    // End the loading
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

// Delete single note permanently
export const permanentDeleteNote = (note: NoteType) => async (
  dispatch: Dispatch
): Promise<any> => {
  try {
    // Start the loading
    dispatch(setNotesLoadingStatus(true));
    const db = firebase.firestore();

    await db.collection("notes").doc(note.id).delete();
    dispatch({
      type: DELETE_NOTE,
      updatedNote: note,
    });
    // End the loading
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

// Restore the note back to its former location
export const restoreNote = (note: NoteType) => async (
  dispatch: Dispatch<any>,
  getState: () => StoreType
): Promise<any> => {
  try {
    const db = firebase.firestore();
    // Start the loading
    dispatch(setNotesLoadingStatus(true));
    // Get all the notebooks existing
    const { notebooks } = getState();

    // Check if the note belong to any notebook
    const notebookNoteBelongTo = notebooks.find((notebook) =>
      notebook.notes.includes(note.id)
    );
    // If not, i.e the notebook was deleted, then move the note to default notebook MY_HOME
    if (!notebookNoteBelongTo) {
      const homeNotebook = notebooks.find(
        (notebook) => notebook.name === MY_HOME
      );
      if (!homeNotebook) {
        throw new Error(
          "Cannot find default My Home notebook, which suggest something went wrong"
        );
      }
      dispatch(addNoteToNotebook(note, homeNotebook));
    }

    // Update the inTrash field of note to false
    await db.collection("notes").doc(note.id).update({
      inTrash: false,
    });
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: { ...note, inTrash: false },
    });
    // End the loading
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};
