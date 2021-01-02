import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('return 404 if product not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/products/${id}`).send().expect(404);
});

it('return 201 if product found', async () => {
  const title = 'test';
  const price = 10;

  const response = await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    });

  const productFetch = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send()
    .expect(200);

  expect(productFetch.body.title).toEqual(title);
  expect(productFetch.body.price).toEqual(price);
});
