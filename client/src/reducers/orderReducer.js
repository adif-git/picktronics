import {
  FETCH_ORDER,
  FETCH_ORDERS,
  CREATE_ORDER,
  CREATE_PAYMENT,
} from '../actions/types';
import _ from 'lodash';

const orderReducer = (state = { data: {}, error: [] }, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...state, data: { ..._.mapKeys(action.data, 'id') }, error: [] };
    case FETCH_ORDER:
      if (!_.has(action.data, 'errors')) {
        return { ...state, data: { [action.data.id]: action.data }, error: [] };
      } else {
        return { ...state, data: {}, error: action.data.errors };
      }
    case CREATE_ORDER:
      if (!_.has(action.data, 'errors')) {
        return { ...state, data: { [action.data.id]: action.data }, error: [] };
      } else {
        return { ...state, data: {}, error: action.data.errors };
      }
    case CREATE_PAYMENT:
      if (!_.has(action.data, 'errors')) {
        return { ...state, data: { [action.data.id]: action.data }, error: [] };
      } else {
        return { ...state, data: {}, error: action.data.errors };
      }
    default:
      return state;
  }
};

export default orderReducer;
