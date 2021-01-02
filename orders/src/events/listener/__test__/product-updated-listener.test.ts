import { natsWrapper } from '../../../nats-wrapper';
import { ProductUpdatedListener } from '../product-updated-listener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/product';
import { ProductUpdatedEvent } from '@picktronics/common';

const setup = async () => {
  // Create a listener
  const listener = new ProductUpdatedListener(natsWrapper.client);

  // Create and save a product
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
  });
  await product.save();

  // Create a fake data object
  const data: ProductUpdatedEvent['data'] = {
    version: product.version + 1,
    userId: 'user',
    id: product.id!,
    title: 'test2',
    price: 20,
  };

  // Create a fake msg object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { listener, data, product, msg };
};

it('finds, updates, and saves a ticket', async () => {
  const { listener, msg, data, product } = await setup();

  await listener.onMessage(data, msg);

  const updatedProduct = await Product.findById(product.id);

  expect(updatedProduct!.title).toEqual(data.title);
  expect(updatedProduct!.price).toEqual(data.price);
  expect(updatedProduct!.version).toEqual(data.version);
});

it('ack the message', async () => {
  const { listener, msg, data, product } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('failed to call ack when event has skipped version number', async () => {
  const { listener, msg, data, product } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (error) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
