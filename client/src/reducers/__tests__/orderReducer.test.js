import {
  FETCH_ORDER,
  FETCH_ORDERS,
  CREATE_ORDER,
  CREATE_PAYMENT,
} from '../../actions/types';
import reducer from '../orderReducer';
import _ from 'lodash';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    data: {},
    error: [],
  });
});

it('should handle FETCH_ORDERS', () => {
  expect(
    reducer([], {
      type: FETCH_ORDERS,
      data: {},
    })
  ).toEqual({
    data: {},
    error: [],
  });
});

const order = {
  id: 1,
  product: {
    title: 'test',
    price: 10,
  },
};

const error = {
  errors: [
    {
      message: 'Error occured',
    },
  ],
};

it('should handle FETCH_ORDER if order defined', () => {
  expect(
    reducer([], {
      type: FETCH_ORDER,
      data: order,
    })
  ).toEqual({
    data: { [order.id]: order },
    error: [],
  });
});

it('should handle FETCH_ORDER if order error', () => {
  expect(
    reducer([], {
      type: FETCH_ORDER,
      data: error,
    })
  ).toEqual({
    data: {},
    error: error.errors,
  });
});

it('should handle CREATE_ORDER if order defined', () => {
  expect(
    reducer([], {
      type: CREATE_ORDER,
      data: order,
    })
  ).toEqual({
    data: { [order.id]: order },
    error: [],
  });
});

it('should handle CREATE_ORDER if order error', () => {
  expect(
    reducer([], {
      type: CREATE_ORDER,
      data: error,
    })
  ).toEqual({
    data: {},
    error: error.errors,
  });
});

it('should handle CREATE_PAYMENT if payments succesful', () => {
  expect(
    reducer([], {
      type: CREATE_PAYMENT,
      data: order,
    })
  ).toEqual({
    data: { [order.id]: order },
    error: [],
  });
});

it('should handle CREATE_PAYMENT if payments error', () => {
  expect(
    reducer([], {
      type: CREATE_PAYMENT,
      data: error,
    })
  ).toEqual({
    data: {},
    error: error.errors,
  });
});
