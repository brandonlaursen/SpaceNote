import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = "notebooks/GET_NOTEBOOKS";
const POST_NOTEBOOK = "notebooks/POST_NOTEBOOK";
const DELETE_NOTEBOOK = "notebooks/DELETE_NOTEBOOK";
const EDIT_NOTEBOOK = "notebooks/EDIT_NOTEBOOK";

// const GET_NOTES = "notes/GET_NOTES";
// const GET_NOTEBOOK = "notebooks/GET_NOTEBOOK";

const getNotebooks = (notebooks) => ({
  type: GET_NOTEBOOKS,
  notebooks,
});

const postNotebook = (notebook) => ({
  type: POST_NOTEBOOK,
  notebook,
});

const deleteNotebook = (notebook) => ({
  type: DELETE_NOTEBOOK,
  notebook,
});

const editNotebook = (notebook) => ({
  type: EDIT_NOTEBOOK,
  notebook,
});

// const getNotebookNotes = (notes) => ({
//   type: GET_NOTES,
//   notes,
// });

// const getNotebook = (notebook) => ({
//   type: GET_NOTEBOOK,
//   notebook,
// });

export const getNotebooksThunk = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/${userId}`);

  if (res.ok) {
    const notebooks = await res.json();
    dispatch(getNotebooks(notebooks));
    return notebooks;
  }
};

export const postNotebookThunk = (newNotebook) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNotebook),
  });

  if (res.ok) {
    const notebook = await res.json();
    dispatch(postNotebook(notebook));
    return notebook;
  }
};

export const deleteNotebookThunk = (notebookId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const notebook = await res.json();
    dispatch(deleteNotebook(notebook));
    return notebook;
  }
};

export const editNotebookThunk = (payload, notebookId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const notebook = await res.json();
  dispatch(editNotebook(notebook));
  return notebook;
};

// export const getNotebookNotesThunk = (notebookId) => async (dispatch) => {
//   const res = await fetch(`/api/notebooks/${notebookId}/notes`);

//   if (res.ok) {
//     const notebookNotes = await res.json();
//     dispatch(getNotebookNotes(notebookNotes));
//   }
// };

// export const getNotebookThunk = (notebookId) => async (dispatch) => {
//   const res = await fetch(`/api/notebooks/notebook/${notebookId}`);

//   if (res.ok) {
//     const notebook = await res.json();
//     dispatch(getNotebook(notebook));
//   }
// };

const initialState = {};

export default function notebooksReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_NOTEBOOKS:
      newState = {};
      action.notebooks.forEach(
        (notebook) => (newState[notebook.id] = notebook)
      );
      return newState;
    case POST_NOTEBOOK:
      return { ...state, [action.notebook.id]: action.notebook };
    case EDIT_NOTEBOOK:
      return { ...state, [action.notebook.id]: action.notebook };
    case DELETE_NOTEBOOK:
      
      delete newState[action.notebook.id];
      return newState;
    default:
      return state;
  }
}
