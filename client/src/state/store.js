import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';
import registrationReducer from './reducers/registrationReducer';
import userReducer from './reducers/userReducer';
import logger from 'redux-logger'

const store = createStore(
  combineReducers({
    auth: authReducer,
    alert: alertReducer,
    register: registrationReducer,
    user: userReducer
  }),
  applyMiddleware(
    thunk,
    logger
  )
);

export default store;