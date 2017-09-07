import { getConfig } from 'core/config';
import cookie from 'cookie';
const config = getConfig();

const getCookie = () => cookie.parse(document.cookie);
const getKey = key => obj => obj[key];

export const uploadPhotosApi = photo => {
  const getUserToken = getKey('user_token');
  const token = getUserToken(getCookie());
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = xhr.onerror = () => {
      if (xhr.status === 200) {
        resolve(xhr);
      } else {
        reject(xhr);
      }
    };
    const formData = new FormData();
    formData.append('image', photo);
    xhr.open('POST', `${config.root}${config.urls.uploadPhotos}`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(formData);
  });
};
