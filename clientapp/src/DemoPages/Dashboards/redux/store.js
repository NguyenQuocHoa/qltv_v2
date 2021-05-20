// import { combineReducers, applyMiddleware } from 're'
// import { createStore, combineReducers, applyMiddleware } from 'redux';

import { createStore, combineReducers } from 'redux';

import bookListReducer from './books';

const reducer = combineReducers({
    book: bookListReducer
});

// export default createStore(reducer, applyMiddleware(ReduxThunk));

export default createStore(reducer);