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
  }
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
    return notebook;
  }
}





const initialState = {
  notebooks: null,
  notes: null,
  notebook: null
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
  default:
    return state;
  }
}
