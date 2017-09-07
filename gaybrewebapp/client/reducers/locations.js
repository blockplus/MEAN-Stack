import {
  ADD_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
  FETCHED_ALL_PLACES,
  SAVE_PLACE,
} from '../actions/locations';
const defaulPlaces = [];


const deleteKey = (obj, keyToDelete) => Object
  .keys(obj)
  .filter(key => key !== keyToDelete)
  .reduce((acc, key) => ({ ...acc, ...{ [key]: obj[key] } }), {});

export default (state = defaulPlaces, action = {}) => {
  switch (action.type) {
    case ADD_PLACE:
      return [...state, { id: state.length, added: true }];
    case FETCHED_ALL_PLACES:
      return action.locations.map(location => ({ ...location }));
    case DELETE_PLACE:
      return state.filter(el => el.id !== action.id);
    case SAVE_PLACE:
      return state.map((location) =>
          (location.id === action.id) ?
          action.location :
          location,
        );
    case UPDATE_PLACE:
      return state.map((place) =>
          place.id === action.id ?
          deleteKey(action.place, 'added') :
          place,
        );
    default:
      return state;
  }
};
