export interface UserType {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  id: string;
}

export interface NoteType {
  id: string;
  creator: string;
  timestamp: string;
  content: string;
  title: string;
  shareWith: Array<{
    user: string;
    canWrite: boolean;
  }>;
  inShortcut: boolean;
  inTrash: boolean;
}

export interface NotebookType {
  id: string;
  name: string;
  creator: string;
  notes: Array<string>;
  shareWith: Array<{
    user: string;
    canWrite: boolean;
  }>;
  inShortcut: boolean;
  inTrash: boolean;
  timestamp: string | firebase.firestore.FieldValue;
}

export interface LoadingType {
  notesLoading: boolean;
  notebooksLoading: boolean;
}

export interface StoreType {
  user: UserType;
  notes: NoteType[];
  notebooks: NotebookType[];
  loading: LoadingType;
}
export interface ParamType {
  notebookId: string;
  noteId: string;
}
