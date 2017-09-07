const initialState = {};
import { STRIPE_TOKEN_RECEIVED } from '../actions/stripe';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case STRIPE_TOKEN_RECEIVED:
      return {
        ...action.data,
      };
    default:
      return state;
  }
};
