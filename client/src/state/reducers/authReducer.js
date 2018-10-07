import userConstants from "../actionTypes/authTypes";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {
  user: {
    userData: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingin: false,
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};