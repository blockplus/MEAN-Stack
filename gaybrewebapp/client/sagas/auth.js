import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  USER_SIGNIN_SUCCESS,
  USER_RESET_PASSWORD_SUCCESS,
} from '../actions/user';
import {
  FETCHED_ALL_PLACES,
  FETCH_USER_LOCATIONS,
} from '../actions/locations';
import { fetchAllLocations } from '../actions/locations';
import { showPopup } from '../actions/popup';
import location from 'core/Location';

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* signinSuccess() {
  yield call(location.push, '/locations');
  yield put({ type: FETCH_USER_LOCATIONS });
}

function* fetchUserCallback() {
  const locations = yield call(fetchAllLocations);
  yield put({ type: FETCHED_ALL_PLACES, locations });
}

function* resetPasswordSuccess() {
  yield put(showPopup('signin'));
}

export function* authInit() {
  yield [
    takeEvery(USER_SIGNIN_SUCCESS, signinSuccess),
    takeEvery(FETCH_USER_LOCATIONS, fetchUserCallback),
    takeEvery(USER_RESET_PASSWORD_SUCCESS, resetPasswordSuccess),
  ];
}
