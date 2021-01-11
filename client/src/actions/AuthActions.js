import { AUTH_BEGIN, SIGN_IN, SIGN_OUT, SIGN_UP, CURRENT_USER } from './types';
import axiosBase from '../api/axiosBase';
import history from '../history';

export const authBegin = () => {
  return {
    type: AUTH_BEGIN,
  };
};

export const currentUser = () => async (dispatch) => {
  const response = await axiosBase.get('/users/currentuser');
  console.log(response);
  dispatch({
    type: CURRENT_USER,
    data: response.data.currentUser,
  });
};

export const signUp = (formValues) => async (dispatch) => {
  try {
    const response = await axiosBase.post('/users/signup', {
      ...formValues,
    });

    dispatch({
      type: SIGN_UP,
      data: response.data,
    });

    history.push('/');
  } catch (error) {
    dispatch({
      type: SIGN_UP,
      data: error.response.data,
    });
  }
};

export const signIn = (formValues) => async (dispatch) => {
  try {
    const response = await axiosBase.post('/users/signin', {
      ...formValues,
    });

    dispatch({
      type: SIGN_IN,
      data: response.data,
    });

    history.push('/');
  } catch (error) {
    dispatch({
      type: SIGN_IN,
      data: error.response.data,
    });
  }
};

export const signOut = () => async (dispatch) => {
  await axiosBase.post('/users/signout', {});
  dispatch({
    type: SIGN_OUT,
  });

  history.push('/');
};
