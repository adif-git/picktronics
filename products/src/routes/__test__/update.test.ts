import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('return a 404 if product id not found', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 10,
    })
    .expect(404);
});

it('return a 401 if user not authenticated', async () => {
  const product = await request(app)
    .post('/api/products')
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/products/${product.body.id}`)
    .send({
      title: 'test',
      price: 20,
    })
    .expect(401);
});

it('return a 401 if the user not owner of the product', async () => {
  const response = await request(app)
    .post(`/api/products`)
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 20,
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 30,
    })
    .expect(401);
});

it('return a 400 if update input not valid', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/products`)
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: 20,
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 30,
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      price: 30,
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: -10,
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'test',
    })
    .expect(400);
});

it('return a 200 if update with valid input succesful', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/products`)
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: 20,
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'test2',
      price: 10,
    })
    .expect(200);

  const updatedProduct = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send();

  expect(updatedProduct.body.title).toEqual('test2');
  expect(updatedProduct.body.price).toEqual(10);
});

it('publishes an event', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/products`)
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: 20,
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'test2',
      price: 30,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
