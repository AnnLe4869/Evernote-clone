import firebase from "firebase";
import { Dispatch } from "redux";
import { setLoadingStatus } from "./loadingAction";
import { GET_ALL_NOTES, ADD_NOTE } from "../constants/constants";
import { UserType, NoteType } from "../type/type";

export const getAllNotes = () => async (
  dispatch: Dispatch,
  getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
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

export const addNote = (note: any) => async (
  dispatch: Dispatch,
  getState: () => { user: UserType; [propName: string]: any }
): Promise<any> => {
  // Display the loading
  dispatch(setLoadingStatus(true));
  // Get the user's id
  const { user } = getState();
  try {
    const db = firebase.firestore();
    if (user.id !== "") {
      const newNote = {
        creator: user.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: "hello world from Typescript",
        title: "hello message",
        shareWith: [],
        inShortcut: false,
        inTrash: false,
      };
      await db.collection("notes").add(newNote);

      dispatch(setLoadingStatus(false));
      return {
        type: ADD_NOTE,
        note: newNote,
      };
    }
  } catch (err) {
    console.error(err);
  }
};
