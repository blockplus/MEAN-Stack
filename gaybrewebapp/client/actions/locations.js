import {
  getAllLocations,
  saveLocation as saveLocationApi,
  updateLocation as updateLocationApi,
  deleteLocation as deleteLocationApi,
} from '../api/locations';

export const ADD_PLACE = 'ADD_PLACE';
export const DELETE_PLACE = 'DELETE_PLACE';
export const UPDATE_PLACE = 'UPDATE_PLACE';
export const FETCHED_ALL_PLACES = 'FETCHED_ALL_PLACES';
export const FETCH_USER_LOCATIONS = 'FETCH_USER_LOCATIONS';
export const SAVE_PLACE = 'SAVE_PLACE';

export const updateLocation = (place, id) => ({ type: UPDATE_PLACE, place, id });
export const deleteLocation = id => ({ type: DELETE_PLACE, id });
export const addPlace = () => ({ type: ADD_PLACE });
export const storeFetchedPlaces = locations => ({ type: FETCHED_ALL_PLACES, locations });
export const saveLocation = (location, id) => ({ type: SAVE_PLACE, id, location });

export const objectKeyLowerCase = (obj = {}) => {
  return Object
    .keys(obj)
    .reduce((acc, key) => ({ ...acc, ...{ [key.toLowerCase()]: obj[key] } }), {});
};


export const fetchAllLocations = () => {
  return getAllLocations().then(
    ({ data, status }) => {
      let locations = [];
      if (status === 200) {
        locations = data.map(objectKeyLowerCase);
      }
      return locations;
    }
  );
};

// const normalizeCoupon = (...coupons) => ({ discounts: [...coupons] });

const toLower = (str = '') => str.toLowerCase();
const normalizeHours = (hours = []) => {
  return hours.reduce((ac, { start, end, day }) => {
    return { ...ac, [toLower(day)]: {
      start,
      end,
    } };
  }, {});
};

const normalizeLocationData = (location) => {
  const { hours } = location;
  // const discounts = normalizeCoupon(couponFirst, couponSecond);
  const openHours = normalizeHours(hours);
  return { ...location, ...{ hours: openHours } };
};


export const savingLocation = (location, idLocation) => (dispatch) => {
  const locationToSave = normalizeLocationData(location);
  return saveLocationApi(locationToSave).then(({ data, status }) => {
    if (status !== 200) {
      console.log('something goes wrong', arguments);
    }
    if (status === 200) {
      const savedLocation = objectKeyLowerCase(data);
      dispatch(saveLocation(savedLocation, idLocation))
    } else {
      const {error = 'Can\'t save your location'} = data
      alert(error);
    }
  });
};

export const deletingLocation = (idLocation) => dispatch => {
  return deleteLocationApi(idLocation).then(({ data, status }) => {
    if (status !== 200) {
      console.log('something goes wrong', arguments);
    }
    if (status === 200) {
      dispatch(deleteLocation(idLocation))
    } else {
      alert('Can\'t delete your location');
    }
  });
}

export const updatingLocation = (location, idLocation) => (dispatch) => {
  const locationToSave = normalizeLocationData(location)
  return updateLocationApi(locationToSave, idLocation).then(({ data, status }) => {
    console.log('status', status, 'data', data)
    if (status !== 200) {
      console.log('something goes wrong', arguments);
    }
    if (status === 200) {
      dispatch(updateLocation(locationToSave, idLocation))
    } else {
      alert('Can\'t update your location');
    }
  });
};
