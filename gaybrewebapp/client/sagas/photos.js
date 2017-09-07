import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import {
  UPLOAD_PHOTO_SUCCESS,
} from '../actions/photos';
import { updateLocation as updateLocationAction } from '../actions/locations'
import { updateLocation } from '../api/locations';

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


function* savePhotosUrl({ url, id, placeID }) {
  const getLocations = (state) => state.locations;
  const locations = yield select(getLocations);
  const [currentLocation] = locations.filter((el) => el.id == placeID);
  const { imageurls = [] } = currentLocation;
  for (let i = 0; i <= 5; i++) {
    imageurls[i] = i === id ? url : imageurls[i] || '';
  }
  try {
    yield call(updateLocation, { imageurls }, placeID);
    yield put(updateLocationAction({ ...currentLocation, ...{ imageurls: imageurls }}, placeID));
  } catch (e) {
    console.error('cant save photo');
  }
}

export function* photosInit() {
  yield [
    takeEvery(UPLOAD_PHOTO_SUCCESS, savePhotosUrl),
  ];
}
