import request from 'supertest';
import { app } from '../../app';

const createProduct = () => {
  return request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 10,
    });
};

it('fetch all products', async () => {
  await createProduct().expect(201);
  await createProduct().expect(201);
  await createProduct().expect(201);

  const response = await request(app).get('/api/products').send().expect(200);

  expect(response.body.length).toEqual(3);
});
