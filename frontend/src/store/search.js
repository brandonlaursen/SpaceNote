import { csrfFetch } from "./csrf";

const SEARCH_NOTES = "notes/SEARCH_NOTES";

const searchNotes = (notes) => {
  return {
    type: SEARCH_NOTES,
    notes,
  };
};

export const searchNotesThunk = (results, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/search/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ results, userId }),
  });

  const searchResults = await res.json();
  dispatch(searchNotes(searchResults));
};

const initialState = [];

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_NOTES:
      return action.notes
    default:
      return state;
  }
};

export default searchReducer;
