import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";

import reducers from '../reducers';
import bookReducer from '../DemoPages/Dashboards/redux/books';



export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers,
      book: bookReducer,
    }),
    applyMiddleware(ReduxThunk),
  );
}