import {
  FETCH_ORDERS,
  FETCH_ORDER,
  CREATE_ORDER,
  CREATE_PAYMENT,
} from './types';
import axiosBase from '../api/axiosBase';
import history from '../history';

export const createOrder = (productId) => async (dispatch) => {
  try {
    const response = await axiosBase.post('/orders', { productId });
    dispatch({
      type: CREATE_ORDER,
      data: response.data,
    });
    history.push(`/orders/${response.data.id}`);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER,
      data: error.response.data,
    });
  }
};

export const fetchOrders = () => async (dispatch) => {
  const response = await axiosBase.get('/orders');
  dispatch({
    type: FETCH_ORDERS,
    data: response.data,
  });
};

export const fetchOrder = (orderId) => async (dispatch) => {
  try {
    const response = await axiosBase.get(`/orders/${orderId}`);
    dispatch({
      type: FETCH_ORDER,
      data: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER,
      data: error.response.data,
    });
  }
};

export const createPayment = ({ token, orderId }) => async (dispatch) => {
  try {
    await axiosBase.post('/payments', { token, orderId });

    const order = await axiosBase.get(`/orders/${orderId}`);

    dispatch({
      type: CREATE_PAYMENT,
      data: order.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT,
      data: error.response.data,
    });
  }
};
