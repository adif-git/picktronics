import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import mongoose from 'mongoose';

it('fetches an order', async () => {
  // Create a product
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
  });
  await product.save();

  // Post a order request
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ productId: product.id })
    .expect(201);

  // Fetch the order by id
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);
  expect(fetchedOrder.id).toEqual(order.id);
});

it('return an error if user try fetch other user order', async () => {
  // Create a product
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
  });
  await product.save();

  // Post a order request
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ productId: product.id })
    .expect(201);

  // Fetch the order using other user
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
