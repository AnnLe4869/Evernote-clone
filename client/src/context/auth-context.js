import React from "react";
export default React.createContext({
  userEmail: null,
  userId: null,
  authenticateStatus: false,
  provider: null,
  login: () => {},
  logout: () => {},

  allNotes: [],
  setAllNotes: () => {},
  updateAllNotes: () => {},

  allNotebooks: [],
  setAllNotebooks: () => {},
  updateAllNotebooks: () => {},

  selectedNote: {},
  setSelectedNote: () => {},
  updateNote: () => {},

  selectedNotebook: {},
  setSelectedNotebook: () => {},
  updateNotebook: () => {},

  editorExpandStatus: false,
  setEditorExpandStatus: () => {},
});
