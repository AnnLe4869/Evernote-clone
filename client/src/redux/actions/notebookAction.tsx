import firebase from "firebase";
import { Dispatch } from "redux";
import { setNotebookLoadingStatus } from "./loadingAction";
import {
  GET_ALL_NOTEBOOKS,
  ADD_NOTEBOOK,
  UPDATE_NOTEBOOK,
} from "../constants/constants";
import { UserType, NoteType, StoreType } from "../type/globalType";

export const fetchAllNotebooks = () => async (
  dispatch: Dispatch,
  getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Change the loading status to true
  dispatch(setNotebookLoadingStatus(true));
  // Get the user's id
  const { user } = getState();
  try {
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

export const addNewNotebook = (name: String) => async (
  dispatch: Dispatch,
  getState: () => StoreType
): Promise<any> => {
  // Get the user's id and existing notebooks
  const { user, notebooks } = getState();

  try {
    // Display the loading
    dispatch(setNotebookLoadingStatus(true));
    // Only add new notebook if a notebook of same name hasn't existed yet
    if (!notebooks.find((notebook) => notebook.name === name)) {
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
      const returnedData = await notebookRef.get();

      const doc: any = returnedData.data();
      const newNotebookAdded = {
        ...newNotebook,
        id: notebookRef.id,
        timestamp: doc.timestamp.toDate().toLocaleTimeString(),
      };
      console.log(newNotebookAdded);
      dispatch({
        type: ADD_NOTEBOOK,
        addedNotebook: newNotebookAdded,
      });
      dispatch(setNotebookLoadingStatus(false));
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateNotebook = (note: NoteType) => async (
  dispatch: Dispatch
  //getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Display the loading
  dispatch(setNotebookLoadingStatus(true));
  // Get the user's id
  try {
    const db = firebase.firestore();
    const { content, title, inShortcut, inTrash } = note;

    await db
      .collection("notebooks")
      .doc(note.id)
      .update({
        content,
        title: title ? title : "nothing",
        inShortcut,
        inTrash,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    dispatch(setNotebookLoadingStatus(false));
    dispatch({
      type: UPDATE_NOTEBOOK,
      updatedNotebook: note,
    });
  } catch (err) {
    console.error(err);
  }
};

export const moveNotebookToTrash = (note: NoteType) => async (
  dispatch: Dispatch
  //getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Display the loading
  dispatch(setNotebookLoadingStatus(true));
  // Get the user's id
  try {
    const db = firebase.firestore();
    const { inTrash } = note;

    await db.collection("notes").doc(note.id).update({
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
