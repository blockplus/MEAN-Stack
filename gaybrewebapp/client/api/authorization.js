import { getConfig } from 'core/config';
import fetch from 'client/helpers/ajax';

const config = getConfig();
export const signup = ({ emailValue, passwordValue, nameValue }) =>
  fetch({
    url: `${config.root}${config.urls.signup}`,
    method: 'post',
    body: {
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    },
  });

export const resetPassword = ({ email }) =>
  fetch({
    url: `${config.root}${config.urls.resetPassword}`,
    method: 'post',
    body: {
      email,
    },
  });

export const changePassword = ({ email }) =>
  fetch({
    url: `${config.root}${config.urls.changePassword}`,
    method: 'put',
    body: {
      email,
    },
  });

export const signin = ({ emailValue, passwordValue }) =>
  fetch({
    url: `${config.root}${config.urls.signin}`,
    method: 'post',
    body: {
      email: emailValue,
      password: passwordValue,
    },
  });
