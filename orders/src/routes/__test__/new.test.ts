import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Product } from '../../models/product';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('return an error if the product not found', async () => {
  const productId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ productId })
    .expect(404);
});

it('return an error if product already reserved', async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 20,
  });
  await product.save();

  const order = Order.build({
    product,
    userId: '1234',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ productId: product.id })
    .expect(400);
});

it('succesfully make an order', async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
  });
  await product.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ productId: product.id })
    .expect(201);
});

it('emits an order created events', async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
  });
  await product.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ productId: product.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
