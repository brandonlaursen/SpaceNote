import { csrfFetch } from './csrf';

const SEARCH_NOTES = "notes/SEARCH_NOTES"

const searchNotes = (notes) => {
  return {
    type: SEARCH_NOTES,
    payload: notes
  };
};


export const searchNotesThunk = (results, userId) => async(dispatch) => {
  const res = await csrfFetch(`/api/search/notes`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ results, userId })
  })

  const data = await res.json();
  dispatch(searchNotes(data))
}


const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_NOTES:
      return {...state, notes: action.payload.notes }
    default:
      return state;
  }
}

export default searchReducer;
