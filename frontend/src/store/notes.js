import { csrfFetch } from "./csrf";

const GET_NOTES = "notes/GET_NOTES";
const POST_NOTE = "note/POST_NOTE";
const DELETE_NOTE = "note/DELETE_NOTE";
const EDIT_NOTE = "notes/EDIT_NOTE";
const RESET = "RESET/RESET_NOTE";

// const GET_NOTE = "note/GET_NOTE";

const getNotes = (notes) => ({
  type: GET_NOTES,
  notes,
});

const postNote = (note) => ({
  type: POST_NOTE,
  note,
});

const deleteNote = (note) => ({
  type: DELETE_NOTE,
  note,
});

const editNote = (note) => ({
  type: EDIT_NOTE,
  note,
});

// const getNote = (note) => ({
//   type: GET_NOTE,
//   payload: note,
// });

// export const getNoteThunk = (noteId) => async (dispatch) => {
//   const res = await fetch(`/api/notes/note/${noteId}`);

//   if (res.ok) {
//     const note = await res.json();
//     dispatch(getNote(note));
//   }
// };

export const getNotesThunk = (notebookId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${notebookId}`);

  if (res.ok) {
    const notes = await res.json();
    dispatch(getNotes(notes));
    return notes;
  }
};

export const getUsersNotesThunk = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${userId}`);

  if (res.ok) {
    const notes = await res.json();
    dispatch(getNotes(notes));
    return notes;
  }
};

export const postNoteThunk = (newNote) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  });

  if (res.ok) {
    const note = await res.json();
    dispatch(postNote(note));
    return note;
  }
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const note = await res.json();
    dispatch(deleteNote(note));
    return note;
  }
};

export const editNoteThunk = (payload, noteId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const note = await res.json();
  dispatch(editNote(note));
  return note;
};

const initialState = {};

export const resetAction = () => ({
  type: RESET,
});

export default function notesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_NOTES:
      newState = {};
      action.notes.forEach((note) => (newState[note.id] = note));
      return newState;
    case POST_NOTE:
      return { ...state, [action.note.id]: action.note };
    case EDIT_NOTE:
      return { ...state, [action.note.id]: action.note };
    case DELETE_NOTE:
      newState = { ...state };
      delete newState[action.note.id];
      return newState;
    case RESET:
      return {};
    default:
      return state;
  }
}
