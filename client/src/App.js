import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./App.css";

const db = firebase.firestore();
function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    db.collection("notes").onSnapshotsInSync();
    return () => {};
  }, []);

  return <div className="App">hello</div>;
}

export default App;
