import * as types from './types';
import axiosBase from '../api/axiosBase';
import history from '../history';

// =============================== AUTH ACTIONS ========================
export const authBegin = () => {
  return {
    type: types.AUTH_BEGIN,
  };
};

export const currentUser = () => async (dispatch) => {
  const response = await axiosBase.get('/users/currentuser');
  dispatch({
    type: types.CURRENT_USER,
    payload: response.data.currentUser,
  });
};

export const signUp = (formValues) => async (dispatch) => {
  dispatch({
    type: types.AUTH_BEGIN,
  });

  try {
    const response = await axiosBase.post('/users/signup', {
      ...formValues,
    });

    dispatch({
      type: types.SIGN_UP_SUCCESS,
      payload: response.data,
    });

    history.push('/');
  } catch (error) {
    dispatch({
      type: types.SIGN_UP_ERROR,
      error: error.response.data.errors,
    });
  }
};

export const signIn = (formValues) => async (dispatch) => {
  dispatch({
    type: types.AUTH_BEGIN,
  });

  try {
    const response = await axiosBase.post('/users/signin', {
      ...formValues,
    });

    dispatch({
      type: types.SIGN_IN_SUCCESS,
      payload: response.data,
    });

    history.push('/');
  } catch (error) {
    dispatch({
      type: types.SIGN_IN_ERROR,
      error: error.response.data.errors,
    });
  }
};

export const signOut = () => async (dispatch) => {
  await axiosBase.post('/users/signout', {});
  dispatch({
    type: types.SIGN_OUT,
  });

  history.push('/');
};

// =============================== PRODUCTS ACTIONS ========================
export const fetchProducts = () => async (dispatch) => {
  const { data } = await axiosBase.get('/products');
  dispatch({
    type: types.FETCH_PRODUCTS,
    data,
  });
};

export const fetchProduct = (productId) => async (dispatch) => {
  try {
    const { data } = await axiosBase.get(`/products/${productId}`);
    dispatch({
      type: types.FETCH_PRODUCT,
      data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_PRODUCT,
      data: error.response.data,
    });
  }
};

export const createProduct = (formValues) => async (dispatch) => {
  try {
    const response = await axiosBase.post('/products', { ...formValues });
    dispatch({
      type: types.CREATE_PRODUCT,
      data: response.data,
    });
    history.push('/products');
  } catch (error) {
    dispatch({
      type: types.CREATE_PRODUCT,
      data: error.response.data,
    });
  }
};

export const updateProduct = (formValues, id) => async (dispatch) => {
  try {
    const response = await axiosBase.put(`/products/${id}`, { ...formValues });
    dispatch({
      type: types.UPDATE_PRODUCT,
      data: response.data,
    });
    history.push('/products');
  } catch (error) {
    dispatch({
      type: types.UPDATE_PRODUCT,
      data: error.response.data,
    });
  }
};

// =============================== ORDERS ACTIONS ========================
export const createOrder = (productId) => async (dispatch) => {
  try {
    const response = await axiosBase.post('/orders', { productId });
    dispatch({
      type: types.CREATE_ORDER,
      data: response.data,
    });
    history.push(`/orders/${response.data.id}`);
  } catch (error) {
    dispatch({
      type: types.CREATE_ORDER,
      data: error.response.data,
    });
  }
};

export const fetchOrders = () => async (dispatch) => {
  const response = await axiosBase.get('/orders');
  dispatch({
    type: types.FETCH_ORDERS,
    data: response.data,
  });
};

export const fetchOrder = (orderId) => async (dispatch) => {
  try {
    const response = await axiosBase.get(`/orders/${orderId}`);
    dispatch({
      type: types.FETCH_ORDER,
      data: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_ORDER,
      data: error.response.data,
    });
  }
};

// =============================== PAYMENTS ACTIONS ========================
export const createPayment = ({ token, orderId }) => async (dispatch) => {
  try {
    await axiosBase.post('/payments', { token, orderId });

    const order = await axiosBase.get(`/orders/${orderId}`);

    dispatch({
      type: types.CREATE_PAYMENT,
      data: order.data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_PAYMENT,
      data: error.response.data,
    });
  }
};
