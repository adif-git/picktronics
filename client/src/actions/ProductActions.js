import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from './types';
import axiosBase from '../api/axiosBase';
import history from '../history';

export const fetchProducts = () => async (dispatch) => {
  const { data } = await axiosBase.get('/products');
  dispatch({
    type: FETCH_PRODUCTS,
    data,
  });
};

export const fetchProduct = (productId) => async (dispatch) => {
  try {
    const { data } = await axiosBase.get(`/products/${productId}`);
    dispatch({
      type: FETCH_PRODUCT,
      data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT,
      data: error.response.data,
    });
  }
};

export const createProduct = (formValues) => async (dispatch) => {
  try {
    const response = await axiosBase.post('/products', { ...formValues });
    dispatch({
      type: CREATE_PRODUCT,
      data: response.data,
    });
    history.push('/products');
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT,
      data: error.response.data,
    });
  }
};

export const updateProduct = (formValues, id) => async (dispatch) => {
  try {
    const response = await axiosBase.put(`/products/${id}`, { ...formValues });
    dispatch({
      type: UPDATE_PRODUCT,
      data: response.data,
    });
    history.push('/products');
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT,
      data: error.response.data,
    });
  }
};
