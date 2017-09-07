import cookie from 'cookie';
import { getConfig } from 'core/config';
import { week } from './times';

const config = getConfig();
export const setCookie = (name, value, maxAge = week) => {
  const date = new Date();
  date.setTime(date.getTime() + maxAge);
  document.cookie = cookie.serialize(name, `${value}`, {
    expires: date,
    path: '/',
    domain: config.domains.cookie,
  });
};

export const deleteCookie = (value) => {
  document.cookie = `${value}=;path=/;domain=${config.domains.cookie};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
