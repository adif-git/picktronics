import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@picktronics/common';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publisher/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60; // 1 minute

router.post(
  '/api/orders',
  requireAuth,
  [
    body('productId')
      .not()
      .isEmpty()
      // Check if productId is a valid mongoose id
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('ProductId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId } = req.body;

    // Find a product in database
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError();
    }

    // Make sure that this product is not reserved
    // Run query to look at all orders. Find an order where the product
    // is the product we just found and the orders status isn't cancelled.
    // If we find an order from that means the product is reserved
    const isReserved = await product.isReserved();
    if (isReserved) {
      throw new BadRequestError('Product is already reserved');
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      product,
    });
    await order.save();

    // Publish order created event
    new OrderCreatedPublisher(natsWrapper.client).publish({
      //@ts-ignore
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      product: {
        id: product.id!,
        price: product.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
