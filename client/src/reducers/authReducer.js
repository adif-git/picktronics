import {
  AUTH_BEGIN,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  CURRENT_USER,
} from '../actions/types';

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
      if (action.payload === null) {
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
          user: action.payload,
          error: [],
        };
      }

    // ====================== SIGN UP REDUCERS ===============================
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: { ...action.payload },
        error: [],
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        isSignedIn: false,
        user: {},
        error: action.error,
      };

    // ====================== SIGN IN REDUCERS ===============================
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: { ...action.payload },
        error: [],
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        isSignedIn: false,
        user: {},
        error: action.error,
      };

    // ====================== SIGN OUT REDUCERS ===============================
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
