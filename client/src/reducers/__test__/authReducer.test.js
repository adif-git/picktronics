import reducer from '../authReducer';
import {
  AUTH_BEGIN,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  CURRENT_USER,
} from '../../actions/types';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    isSignedIn: false,
    user: {},
    error: [],
  });
});

it('should handle AUTH_BEGIN', () => {
  expect(reducer([], { type: AUTH_BEGIN })).toEqual({
    error: [],
  });
});

const user = {
  id: '1234',
  email: 'test@test.com',
};

const errorForm = {
  errors: [
    {
      message: 'Email must be valid',
    },
  ],
};

it('should handle CURRENT_USER if userId defined', () => {
  expect(
    reducer([], {
      type: CURRENT_USER,
      data: user.id,
    })
  ).toEqual({
    isSignedIn: true,
    user: user.id,
    error: [],
  });
});

it('should handle CURRENT_USER if data empty', () => {
  expect(
    reducer([], {
      type: CURRENT_USER,
      data: null,
    })
  ).toEqual({
    isSignedIn: false,
    user: {},
    error: [],
  });
});

it('should handle SIGN_UP if form exist', () => {
  expect(
    reducer([], {
      type: SIGN_UP,
      data: user,
    })
  ).toEqual({
    isSignedIn: true,
    user,
    error: [],
  });
});

it('should handle SIGN_UP if form gives error', () => {
  expect(
    reducer([], {
      type: SIGN_UP,
      data: errorForm,
    })
  ).toEqual({
    isSignedIn: false,
    user: {},
    error: errorForm.errors,
  });
});

it('should handle SIGN_IN if form exist', () => {
  expect(
    reducer([], {
      type: SIGN_IN,
      data: user,
    })
  ).toEqual({
    isSignedIn: true,
    user,
    error: [],
  });
});

it('should handle SIGN_IN if form gives error', () => {
  expect(
    reducer([], {
      type: SIGN_IN,
      data: errorForm,
    })
  ).toEqual({
    isSignedIn: false,
    user: {},
    error: errorForm.errors,
  });
});

it('should handle SIGN_OUT', () => {
  expect(
    reducer([], {
      type: SIGN_OUT,
    })
  ).toEqual({
    isSignedIn: false,
    user: {},
    error: [],
  });
});
