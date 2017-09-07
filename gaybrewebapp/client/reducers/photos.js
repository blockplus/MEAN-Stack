const initialState = [];
import { UPLOAD_PHOTO_SUCCESS } from '../actions/photos';
import { FETCHED_ALL_PLACES } from '../actions/locations'

const getValue = key => obj => obj[key]
const getImageUrls = getValue('imageurls')
const getPlaceId = getValue('id')
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPLOAD_PHOTO_SUCCESS:
      const { placeID, id, url } = action;
      return {
        ...action.data,
      };
    case FETCHED_ALL_PLACES:
      const { locations } = action;
      const images = locations.map(getImageUrls);
      const ids = locations.map(getPlaceId);
      const placeImages = ids.reduce((acc, curr, index) => ({...acc, [curr]: images[index]}), {});
      return state
    default:
      return state;
  }
};
