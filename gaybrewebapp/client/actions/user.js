import {
  signup as signupApi,
  signin as signinApi,
  resetPassword as resetPasswordApi,
} from '../api/authorization';
import { setCookie } from '../helpers/cookie';
import { hidePopup } from './popup';

export const USER_REGISTRED_SUCCESS = 'USER_REGISTRED_SUCCESS';
export const USER_REGISTRED_FAILURE = 'USER_REGISTRED_FAILURE';

export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_UPDATE_PROFILE = 'USER_UPDATE_PROFILE';
export const USER_UPDATE_STRIPE_TOKEN = 'USER_UPDATE_STRIPE_TOKEN';

export const USER_RESET_PASSWORD_FAILURE = 'USER_RESET_PASSWORD_FAILURE';
export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';

export const OPEN_SIGNUP = 'OPEN_SIGNUP';
export const CLOSE_SIGNUP = 'CLOSE_SIGNUP';

export const userUpdateStripeToken = (data) => ({ type: USER_UPDATE_STRIPE_TOKEN, data });
export const userRegistred = (data) => ({ type: USER_REGISTRED_SUCCESS, data });
export const signinUser = () => (dispatch, getState) => {
  const { form: { signinForm } } = getState();
  const { email: { value: emailValue }, password: { value: passwordValue } } = signinForm;
  return signinApi({ emailValue, passwordValue }).then(
    ({ data = {}, status }) => {
      const { token } = data;
      if (status !== 200) {
        dispatch({ type: USER_LOGIN_FAILURE });
      }
      if (token) {
        setCookie('user_token', token);
        dispatch(hidePopup());
        dispatch({ type: USER_SIGNIN_SUCCESS, data: { email: emailValue } });
      }
    },
    () => {
      dispatch({ type: USER_LOGIN_FAILURE });
    }
  );
};

export const userLogout = () => ({ type: USER_SIGNIN_SUCCESS, userLogout });
export const signupUser = () => (dispatch, getState) => {
  const { form: { signupForm } } = getState();
  const { email: { value: emailValue }, password: { value: passwordValue }, name: { value: nameValue } } = signupForm;
  return signupApi({ emailValue, passwordValue, nameValue }).then(
    ({ data = {}, status }) => {
      const { token } = data;
      if (status !== 200) {
        dispatch({ type: USER_REGISTRED_FAILURE });
      }
      if (token) {
        setCookie('user_token', token);
        dispatch({ type: USER_REGISTRED_SUCCESS, data: { email: emailValue, name: nameValue } });
      }
    },
    () => {
      dispatch({ type: USER_REGISTRED_FAILURE });
    }
  );
};

export const resetPassword = () => (dispatch, getState) => {
  const { form: { forgotPasswordForm } } = getState();
  const { email: { value: emailValue } } = forgotPasswordForm;
  return resetPasswordApi({ emailValue }).then(
    ({ status }) => {
      if (status !== 200) {
        dispatch({ type: USER_RESET_PASSWORD_FAILURE });
      } else {
        dispatch({ type: USER_RESET_PASSWORD_SUCCESS });
      }
    },
    () => {
      dispatch({ type: USER_RESET_PASSWORD_FAILURE });
    }
  );
};
