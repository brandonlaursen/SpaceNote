import { csrfFetch } from './csrf';


//GET ALL NOTEBOOKS OF A USER WORKS
const GET_NOTEBOOKS = "notebooks/GET_NOTEBOOKS";

const getUserNotebooks = (notebooks) => ({
  type: GET_NOTEBOOKS,
  payload: notebooks

});

export const getUsersNotebooksThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${userId}`);

  if(res.ok) {
    const allUsersNotebooks = await res.json();
    dispatch(getUserNotebooks(allUsersNotebooks));
  }
}

//GET ALL NOTES OF A NOTEBOOK
const GET_NOTES = "notes/GET_NOTES";

const getNotebookNotes = (notes) => ({
  type: GET_NOTES,
  payload: notes
});

export const getNotebookNotesThunk = (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}/notes`);

  if(res.ok) {
    const notebookNotes = await res.json();
    dispatch(getNotebookNotes(notebookNotes));
    return 'ok';
  }
}

//GET A NOTEBOOK
const GET_NOTEBOOK = "notebooks/GET_NOTEBOOK";

const getNotebook = (notebook) => ({
  type: GET_NOTEBOOK,
  payload: notebook
});

export const getNotebookThunk = (notebookId) =>async(dispatch) => {
  const res = await fetch(`/api/notebooks/notebook/${notebookId}`);

  if(res.ok) {
    const notebook = await res.json();
    dispatch(getNotebook(notebook));
    if(!notebook) {
      return "bad"
    }
  }
  return "ok"
}


//POST A NOTEBOOK
const POST_NOTEBOOK = "notebooks/POST_NOTEBOOK";

const postNotebook = (notebooks) => ({
  type: POST_NOTEBOOK,
  payload: notebooks
})

export const postNotebookThunk = (newNotebook) => async(dispatch) => {
  const res = await csrfFetch(`/api/notebooks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNotebook)
  });

  if(res.ok) {
    const notebook = await res.json();
    dispatch(postNotebook(notebook));
    return "ok"
  }
}

//DELETE A NOTEBOOK
const DELETE_NOTEBOOK = "notebooks/DELETE_NOTEBOOK";

const deleteNotebook = (notebookId) => ({
  type: DELETE_NOTEBOOK,
  payload: notebookId
});

export const deleteNotebookThunk = (notebookId) => async(dispatch) => {
  const res = await csrfFetch(`/api/notebooks/notebook/${notebookId}`, {
      method: "DELETE",
  });
  if(res.ok) {
    const oldNotebook = await res.json();
    dispatch(deleteNotebook(oldNotebook));
    if(!oldNotebook) {

    }
    return "ok"
  }

}


//EDIT A NOTEBOOK
const EDIT_NOTEBOOK = "notebooks/EDIT_NOTEBOOK";

const editNotebook = (notebookId) => ({
  type: EDIT_NOTEBOOK,
  payload: notebookId
});

export const editNotebookThunk = (payload, notebookId) => async(dispatch) => {
  const res = await csrfFetch(`/api/notebooks/notebook/${notebookId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const notebook = await res.json();
  dispatch(editNotebook(notebook));
  return notebook;
}

const initialState = {
  notebooks: null,
  notes: null
};

export default function notebooksReducer(state=initialState, action) {
  switch(action.type) {
    case GET_NOTEBOOKS: {
      return { ...state, notebooks: action.payload };
    }
    case GET_NOTES: {
      return { ...state, notes: action.payload }
    }
    case GET_NOTEBOOK: {
      return { ...state, notebook: action.payload }
    }
    case POST_NOTEBOOK: {
      return { ...state, notebooks: action.payload };
    }
    case EDIT_NOTEBOOK: {
      return { ...state, notebooks: action.payload };
    }
  default:
    return state;
  }
}
