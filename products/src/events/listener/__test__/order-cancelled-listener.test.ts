import { OrderCancelledEvent, OrderStatus } from '@picktronics/common';
import mongoose from 'mongoose';
import { Product } from '../../../models/product';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  // create a listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // create a dummy product
  const orderId = mongoose.Types.ObjectId().toHexString();
  const product = Product.build({
    title: 'test',
    price: 10,
    userId: 'user',
  });
  product.set({ orderId });
  await product.save();

  // create fake data event
  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    product: {
      id: product.id!,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, msg, data, product, orderId };
};

it('update product to cancelled, publish an event and ack message', async () => {
  const { listener, msg, data, product, orderId } = await setup();

  await listener.onMessage(data, msg);

  const updatedProduct = await Product.findById(product.id);
  expect(updatedProduct!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
