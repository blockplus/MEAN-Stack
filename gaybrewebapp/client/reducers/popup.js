import { SHOW_POPUP, HIDE_POPUP, LOADING_POPUP, STRIPE_POPUP } from '../actions/popup';
const initialState = {
  show: false,
  popupType: '',
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_POPUP:
      return {
        show: true,
        loading: false,
        ...action.data,
      };
    case HIDE_POPUP:
      return {
        ...state,
        loading: false,
        show: false,
      };
    case STRIPE_POPUP:
      return {
        show: true,
        loading: false,
        popupType: '',
      };
    case LOADING_POPUP:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
