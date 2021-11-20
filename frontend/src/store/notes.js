import { csrfFetch } from './csrf';


//GET ALL NOTES OF A USER
const GET_NOTES = "notes/GET_NOTES"

const getUserNotes = (notes) => ({
  type: GET_NOTES,
  payload: notes
});

export const getUsersNotesThunk  = (userId) => async(dispatch) => {
  const res = await fetch(`/api/notes/${userId}`);

  if(res.ok) {
    const allUsersNotes = await res.json();
    dispatch(getUserNotes(allUsersNotes));
  }
}


//GET A NOTE
const GET_NOTE = "note/GET_NOTE"

const getNote = (note) => ({
  type: GET_NOTE,
  payload: note
})

export const getNoteThunk= (noteId) => async(dispatch) => {
  const res = await fetch(`/api/notes/note/${noteId}`);

  if(res.ok) {
    const note = await res.json();
    dispatch(getNote(note));
  }
}


//DELETE A NOTE
const DELETE_NOTE = "note/DELETE_NOTE"

const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId
})

export const deleteNoteThunk = (noteId) => async(dispatch) => {
  const res = await csrfFetch(`/api/notes/note/${noteId}`, {
    method: "DELETE",
  });

  if(res.ok) {
    const oldNote = await res.json();
    dispatch(deleteNote(oldNote));
  }
}


//POST A NOTE
const POST_NOTE = "note/POST_NOTE"

const postNote = (note) => ({
  type: POST_NOTE,
  payload: note
})

export const postNoteThunk = (newNote) => async(dispatch) => {
  const res = await csrfFetch(`/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote)
  });

  if(res.ok) {
    const note = await res.json();
    dispatch(postNote(note));
    return note;
  }
}


//EDIT A NOTE
const EDIT_NOTE = "notes/EDIT_NOTE";

const editNote = (noteId) => ({
  type: EDIT_NOTE,
  payload: noteId
});

export const editNoteThunk = (payload, noteId) => async(dispatch) => {
  const res = await csrfFetch(`/api/notes/note/${noteId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const note = await res.json();
  dispatch(postNote(note));
  return note;
}



const initialState = {
  notes: null,
  note: null
}

export default function notesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_NOTES: {
      return {...state, notes: action.payload }
    }
    case GET_NOTE: {
      return {...state, note: action.payload }
    }
    case POST_NOTE: {
      if (action.payload.id) {
      return {
        ...state,
        [action.payload.id]: action.payload.note,
      };

    } else {
      return state;
    }
    }
    case EDIT_NOTE: {
      return { ...state, notes: action.payload };
    }
  default:
    return state;
  }
}

