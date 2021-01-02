import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/products for post request', async () => {
  const response = await request(app).post('/api/products').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed when user sign in', async () => {
  await request(app).post('/api/products').send({}).expect(401);
});

it('return a status other than 401 when user signed in', async () => {
  const response = await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({ title: '', price: 10 })
    .expect(400);

  await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({ price: 10 })
    .expect(400);
});

it('returns error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({ title: 'test', price: -10 })
    .expect(400);

  await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({ title: 'test' })
    .expect(400);
});

it('creates a product with valid input', async () => {
  let products = await Product.find({});
  expect(products.length).toEqual(0);

  await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({ title: 'test', price: 10 })
    .expect(201);

  products = await Product.find({});
  expect(products.length).toEqual(1);
});

it('publishes an event', async () => {
  const title = 'test';

  await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
