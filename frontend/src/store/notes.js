


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

const initialState = {
  notes: null
}


export default function notesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_NOTES: {
      return {...state, notes: action.payload }
    }
  default:
    return state;
  }
}
