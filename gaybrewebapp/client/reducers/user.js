import { USER_SIGNIN_SUCCESS, USER_REGISTRED_SUCCESS, USER_REGISTRED_FAILURE, USER_LOGIN_FAILURE } from '../actions/user';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...action.data,
        status: 'success_signin',
      };
    case USER_REGISTRED_SUCCESS:
      return {
        ...action.data,
        status: 'success_signup',
      };
    case USER_REGISTRED_FAILURE:
      return {
        status: 'signup_failure',
      };
    case USER_LOGIN_FAILURE:
      return {
        status: 'signin_failure',
      };
    default:
      return state;
  }
};
