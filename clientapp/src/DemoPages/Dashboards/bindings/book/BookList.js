import { connect } from "react-redux";

import BookList from "../../book/BookList";
import { setToggle, fetchBooks } from "../../redux/books";

// x: match redux-state
const mapStateToProps = (state) => {
  return {
    books: state.book.items,
    toggle: state.book.toggle,
  };
};

// y: match redux-action
const mapActionToProps = (dispatch) => ({
  setToggle: (flag) => dispatch(setToggle(flag)),
  fetchBooks: () => dispatch(fetchBooks())
});

export default connect(mapStateToProps, mapActionToProps)(BookList);



