import types from '../actionTypes/authTypes';
import { userService } from '../../service/userService';
import { alertActions } from './alertActions';
import {history} from '../../helpers/history';

const _login = () => ({
  type: types.LOGIN_REQUEST
})
const _loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: data
})
const _loginRejected = (error) => ({
  type: types.LOGIN_FAILURE,
  error
})
export const login = (username, password) => (dispatch) => {
  
    dispatch(_login())

   return userService.login(username, password)
      .then(
        user => {
          dispatch(_loginSuccess(user));
          history.push('/chat');
        }
      )
      .catch(err => {
        dispatch(_loginRejected(err));
        dispatch(alertActions.error(err.toString()));
      })
}

export const logout = () => (dispatch) => {
  userService.logout();
  return { type: types.LOGOUT };
}

const _register = () => ({
  type: types.REGISTER_REQUEST
})
const _registerSuccess = (data) => ({
  type: types.REGISTER_SUCCESS,
  payload:data
})
const _registerRejected = (error) => ({
  type: types.REGISTER_FAILURE,
  error
})
export const register = (user) => (dispatch) => {
  
    dispatch(_register());

   return userService.register(user)
      .then(
        resp => {
          console.log(resp);
          if (resp.status !== 200) {
            return Promise.reject(resp)
          }
          
          dispatch(_registerSuccess(resp.user));
          history.push('/chat');
          return resp
        }
      )
      .catch(err => {
        dispatch(_registerRejected(err));
      
        return Promise.reject(err)
      })
 
}

export function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: types.GETALL_REQUEST } }
  function success(users) { return { type: types.GETALL_SUCCESS, users } }
  function failure(error) { return { type: types.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
export function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: types.DELETE_REQUEST, id } }
  function success(id) { return { type: types.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: types.DELETE_FAILURE, id, error } }
}