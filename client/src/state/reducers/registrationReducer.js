




import userConstants from '../actionTypes/authTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { 
        ...state,
        registering: true
       };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        user: action.payload
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        registering: false,

      };
    default:
      return state
  }
}