import 'whatwg-fetch';
import cookie from 'cookie';

export default (req) => {
  const { url, method = 'get', body, headers = {}, raw } = req;
  const { accept, contentType } = headers;
  const { user_token: token } = cookie.parse(document.cookie);
  const data = {
    method,
    headers: {
      Accept: accept || 'application/json',
      'Content-Type': contentType || 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  if (raw) { // for upload photos
    data.body = body;
  }
  if (!token) {
    delete data.headers.Authorization;
  }
  if (!body) {
    delete data.body;
  }
  return fetch(url, data)
    .then(res => {
      const { status } = res;
      return res.json()
        .then(json => ({ data: json, status }))
        .catch(() => ({ data: res, status }));
    });
};
