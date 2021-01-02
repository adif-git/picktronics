import { ProductCreatedEvent } from '@picktronics/common';
import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { ProductCreatedListener } from '../product-created-listener';
import { Product } from '../../../models/product';

const setup = async () => {
  // create an instance of listener
  const listener = new ProductCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: ProductCreatedEvent['data'] = {
    version: 0,
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
    userId: mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves product', async () => {
  const { listener, data, msg } = await setup();

  // call onMessage function with data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a product created
  const product = await Product.findById(data.id);

  expect(product).toBeDefined();
  expect(product!.title).toEqual(data.title);
  expect(product!.price).toEqual(data.price);
});

it('ack the message', async () => {
  const { listener, data, msg } = await setup();

  // call onMessage function with data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a product created
  expect(msg.ack).toHaveBeenCalled();
});
