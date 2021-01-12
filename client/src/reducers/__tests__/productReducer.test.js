import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../../actions/types';
import reducer from '../productReducer';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    data: {},
    error: [],
  });
});

it('should handle FETCH_PRODUCTS', () => {
  expect(
    reducer([], {
      type: FETCH_PRODUCTS,
      data: {},
    })
  ).toEqual({
    data: {},
    error: [],
  });
});

const product = {
  id: 1,
  title: 'test',
  price: 10,
};

const error = {
  errors: [
    {
      message: 'Error occured',
    },
  ],
};

it('should handle FETCH_PRODUCT if product exist', () => {
  expect(
    reducer([], {
      type: FETCH_PRODUCT,
      data: product,
    })
  ).toEqual({
    data: { [product.id]: product },
    error: [],
  });
});

it('should handle FETCH_PRODUCT if product not exist', () => {
  expect(
    reducer([], {
      type: FETCH_PRODUCT,
      data: error,
    })
  ).toEqual({
    data: {},
    error: error.errors,
  });
});

it('should handle CREATE_PRODUCT if product defined', () => {
  expect(
    reducer([], {
      type: CREATE_PRODUCT,
      data: product,
    })
  ).toEqual({
    data: { [product.id]: product },
    error: [],
  });
});

it('should handle CREATE_PRODUCT if product error', () => {
  expect(
    reducer([], {
      type: CREATE_PRODUCT,
      data: error,
    })
  ).toEqual({
    data: {},
    error: error.errors,
  });
});

it('should handle UPDATE_PRODUCT if product exist', () => {
  expect(
    reducer([], {
      type: UPDATE_PRODUCT,
      data: product,
    })
  ).toEqual({
    data: { [product.id]: product },
    error: [],
  });
});

it('should handle UPDATE_PRODUCT if product error', () => {
  expect(
    reducer([], {
      type: UPDATE_PRODUCT,
      data: error,
    })
  ).toEqual({
    error: error.errors,
  });
});
