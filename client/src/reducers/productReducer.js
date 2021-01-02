import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/types';
import _ from 'lodash';

const productReducer = (state = { data: {}, error: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, data: { ..._.mapKeys(action.data, 'id') }, error: [] };
    case FETCH_PRODUCT:
      if (!_.has(action.data, 'errors')) {
        return { ...state, data: { [action.data.id]: action.data }, error: [] };
      } else {
        return { ...state, data: {}, error: action.data.errors };
      }
    case CREATE_PRODUCT:
      if (!_.has(action.data, 'errors')) {
        return { ...state, data: { [action.data.id]: action.data }, error: [] };
      } else {
        return { ...state, data: {}, error: action.data.errors };
      }
    case UPDATE_PRODUCT:
      if (!_.has(action.data, 'errors')) {
        return { ...state, data: { [action.data.id]: action.data }, error: [] };
      } else {
        return { ...state, error: action.data.errors };
      }
    default:
      return state;
  }
};

export default productReducer;
