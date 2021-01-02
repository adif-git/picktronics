import { Product } from '../../../models/product';
import { natsWrapper } from '../../../nats-wrapper';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../../models/order';
import { Message } from 'node-nats-streaming';
import { ExpirationCompleteEvent } from '@picktronics/common';

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'test',
    price: 10,
  });
  await product.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'user',
    expiresAt: new Date(),
    product,
  });
  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id!,
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, product, data, msg };
};

it('update order status to cancelled', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emit order cancelled event', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
});

it('ack the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
