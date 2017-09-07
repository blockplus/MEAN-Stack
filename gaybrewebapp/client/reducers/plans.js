const initialState = {};
import { SELECT_PLAN } from '../actions/plans';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECT_PLAN:
      return {
        ...action.data,
      };
    default:
      return state;
  }
};
