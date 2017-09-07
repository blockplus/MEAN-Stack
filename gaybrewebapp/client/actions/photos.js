import { uploadPhotosApi } from '../api/photos';
import { updateLocation as savePhotosUrl } from '../api/locations';
export const UPLOAD_PHOTO_ERROR = 'UPLOAD_PHOTO_ERROR';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_PROGRESS = 'UPLOAD_PHOTO_PROGRESS';

export const ulploadPhotoError = () => ({ type: UPLOAD_PHOTO_ERROR });
export const uploadPhotoSuccess = ({ url, id, placeID }) =>
  ({ type: UPLOAD_PHOTO_SUCCESS, url, id, placeID });


  // case FETCHED_ALL_PLACES:
  //   const { locations } = action;
  //   const images = locations.map(getImageUrls);
  //   const ids = locations.map(getPlaceId);
  //   const placeImages = ids.reduce((acc, curr, index) => ({...acc, [curr]: images[index]}), {});
  //   return state
export const uploadPhoto = ({ photo, id, placeID }) => dispatch => {
  console.log(photo, id, placeID)
  return uploadPhotosApi(photo).then(
    xhr => {
      if (xhr.status !== 200) {
        dispatch(ulploadPhotoError());
      } else {
        try {
          const { url } = JSON.parse(xhr.response);
          dispatch(uploadPhotoSuccess({ url, id, placeID }));
        } catch (e) {
          alert('failed to load image');
        }
      }
    },
    () => {
      // dispatch({ type: USER_RESET_PASSWORD_FAILURE });
    }
  );
};

export const savePhoto = ({id, photoUrl}) => (dispatch, getState) => {
  console.log()
  return Promise.resolve()
}
