import { Listener, OrderCancelledEvent, Subjects } from '@picktronics/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publisher/product-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const product = await Product.findById(data.product.id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.set({ orderId: undefined });
    await product.save();

    await new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id!,
      title: product.title,
      orderId: product.orderId,
      userId: product.userId,
      version: product.version,
      price: product.price,
    });

    msg.ack();
  }
}
