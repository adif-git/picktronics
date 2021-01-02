import {
  NotAuthorizeError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from '@picktronics/common';
import express, { Request, Response } from 'express';
import { OrderCancelledPublisher } from '../events/publisher/order-cancelled-publisher';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizeError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id!,
      version: order.version,
      product: {
        id: order.product.id!,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
