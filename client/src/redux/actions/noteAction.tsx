import firebase from "firebase";
import { Dispatch } from "redux";
import { setLoadingStatus } from "./loadingAction";
import { GET_ALL_NOTES, ADD_NOTE, UPDATE_NOTE } from "../constants/constants";
import { UserType, NoteType } from "../type/globalType";

export const fetchAllNotes = () => async (
  dispatch: Dispatch,
  getState: () => { user: UserType; [propName: string]: any }
): Promise<void> => {
  // Change the loading status to true
  dispatch(setLoadingStatus(true));
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
    dispatch(setLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
};

export const addNewNote = () => async (
  dispatch: Dispatch,
  getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Display the loading
  dispatch(setLoadingStatus(true));
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
    const noteRef = await db.collection("notes").add(newNote);
    const returnedData = await noteRef.get();

    const doc = returnedData.data();
    const addedNote = {
      ...doc,
      id: noteRef.id,
      timestamp: doc?.timestamp.toDate().toLocaleTimeString(),
    };

    dispatch(setLoadingStatus(false));
    dispatch({
      type: ADD_NOTE,
      addedNote: addedNote,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateNote = (note: NoteType) => async (
  dispatch: Dispatch
  //getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Display the loading
  dispatch(setLoadingStatus(true));
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
    dispatch(setLoadingStatus(false));
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: note,
    });
  } catch (err) {
    console.error(err);
  }
};

export const moveNoteToTrash = (note: NoteType) => async (
  dispatch: Dispatch
  //getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Display the loading
  dispatch(setLoadingStatus(true));
  // Get the user's id
  try {
    const db = firebase.firestore();
    const { inTrash } = note;

    await db.collection("notes").doc(note.id).update({
      inTrash,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(setLoadingStatus(false));
    dispatch({
      type: UPDATE_NOTE,
      updatedNote: note,
    });
  } catch (err) {
    console.error(err);
  }
};
