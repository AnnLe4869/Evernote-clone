import firebase from "firebase";
import { Dispatch } from "redux";
import { setNotesLoadingStatus } from "./loadingAction";
import { GET_ALL_NOTES, ADD_NOTE, UPDATE_NOTE } from "../constants/constants";
import {
  UserType,
  NoteType,
  NotebookType,
  StoreType,
} from "../type/globalType";
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
      inShortcut: false,
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

export const updateNote = (note: NoteType) => async (
  dispatch: Dispatch
  //getState: () => StoreType
): Promise<any> => {
  // Display the loading
  dispatch(setNotesLoadingStatus(true));
  // Get the user's id
  try {
    const db = firebase.firestore();
    const { content, title, inShortcut, inTrash } = note;
    await db
      .collection("notes")
      .doc(note.id)
      .update({
        content,
        title: title ? title : "nothing",
        inShortcut,
        inTrash,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: note,
    });
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const moveNoteToTrash = (note: NoteType) => async (
  dispatch: Dispatch
  //getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Display the loading
  dispatch(setNotesLoadingStatus(true));
  // Get the user's id
  try {
    const db = firebase.firestore();
    const { inTrash } = note;

    await db.collection("notes").doc(note.id).update({
      inTrash,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: note,
    });
    dispatch(setNotesLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};
