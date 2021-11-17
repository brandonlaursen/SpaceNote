

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
})

export const getNotebookNotesThunk = (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}/notes`);

  if(res.ok) {
    const notebookNotes = await res.json();
    dispatch(getNotebookNotes(notebookNotes));
  }
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
  default:
    return state;
  }
}
