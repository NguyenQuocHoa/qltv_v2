import axios from "axios";
const initState = {
  items: [],
  toggle: false,
  book: {}
};

const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK = 'EDIT_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const SET_BOOKS = 'SET_BOOKS';
const SET_TOGGLE = 'SET_TOGGLE';

export const setBooks = (items) => ({ type: SET_BOOKS, payload: items })
export const setAddBook = (book) => ({ type: ADD_BOOK, payload: book })
export const setEditBook = (book) => ({ type: EDIT_BOOK, payload: book })
export const setToggle = (flag) => ({ type: SET_TOGGLE, payload: flag })

export const fetchBooks = () => async (dispatch) => {
  await axios
  .get("/book")
  .then((res) => {
    if (res.status === 200) {
      dispatch(setBooks(res.data));
    }
  });
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case SET_BOOKS:
      return {
        ...state,
        items: action.payload
      }
    case SET_TOGGLE:
      console.log('set toggle');
      return {
        ...state,
        toggle: action.payload
      }
    default:
      return state;
  }
}

export default reducer;