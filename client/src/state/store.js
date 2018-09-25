import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const store = createStore(
  combineReducers({
    authState: authReducer
  }),
  applyMiddleware(
    thunk
  )
);

export default store;