import { OrderCreatedEvent, OrderStatus } from '@picktronics/common';
import mongoose from 'mongoose';
import { Product } from '../../../models/product';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';

const setup = async () => {
  // create a listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create a dummy product
  const product = Product.build({
    title: 'test',
    price: 10,
    userId: 'user',
  });
  await product.save();

  // create fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'abcd',
    expiresAt: 'abc',
    product: {
      id: product.id!,
      price: product.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, msg, data, product };
};

it('set orderId to product', async () => {
  const { listener, product, msg, data } = await setup();

  await listener.onMessage(data, msg);

  const updatedProduct = await Product.findById(product.id);

  expect(updatedProduct!.orderId).toEqual(data.id);
});

it('ack the message', async () => {
  const { listener, product, msg, data } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publish product update event', async () => {
  const { listener, product, msg, data } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const productUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(productUpdatedData.orderId);
});
