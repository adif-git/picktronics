import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

const buildProduct = async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
  });
  await product.save();

  return product;
};

it('fetches order from a user', async () => {
  // Create a 3 dummy product
  const productOne = await buildProduct();
  const productTwo = await buildProduct();
  const productThree = await buildProduct();

  // Create one order as userOne
  const userOne = global.signin();
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ productId: productOne.id })
    .expect(201);

  // Create two order as userTwo
  const userTwo = global.signin();
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ productId: productTwo.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ productId: productThree.id })
    .expect(201);

  // Fetch userTwo order
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

  // Make sure it is userTwo order
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].product.id).toEqual(productTwo.id);
  expect(response.body[1].product.id).toEqual(productThree.id);
});
