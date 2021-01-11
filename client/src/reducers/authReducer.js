import {
  AUTH_BEGIN,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  CURRENT_USER,
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  isSignedIn: false,
  user: {},
  error: [],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_BEGIN:
      return {
        ...state,
        error: [],
      };
    case CURRENT_USER:
      if (action.data === null) {
        return {
          ...state,
          isSignedIn: false,
          user: {},
          error: [],
        };
      } else {
        return {
          ...state,
          isSignedIn: true,
          user: action.data,
          error: [],
        };
      }
    case SIGN_UP:
      if (!_.has(action.data, 'errors')) {
        return { ...state, isSignedIn: true, user: action.data, error: [] };
      } else {
        return {
          ...state,
          isSignedIn: false,
          user: {},
          error: action.data.errors,
        };
      }
    case SIGN_IN:
      if (!_.has(action.data, 'errors')) {
        return { ...state, isSignedIn: true, user: action.data, error: [] };
      } else {
        return {
          ...state,
          isSignedIn: false,
          user: {},
          error: action.data.errors,
        };
      }
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        user: {},
        error: [],
      };
    default:
      return state;
  }
};

export default authReducer;
