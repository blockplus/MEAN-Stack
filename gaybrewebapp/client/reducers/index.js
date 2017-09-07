import { combineReducers } from 'redux';
import plans from './plans';
import popup from './popup';
import stripe from './stripe';
import user from './user';
import locations from './locations';
import photos from './photos';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  plans,
  popup,
  stripe,
  user,
  locations,
  photos,
  form: formReducer,
});
