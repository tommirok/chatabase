import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import logger from 'redux-logger'

const store = createStore(
  combineReducers({
    authState: authReducer
  }),
  applyMiddleware(
    thunk,
    logger
  )
);

export default store;