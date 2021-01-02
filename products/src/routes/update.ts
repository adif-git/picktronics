import express, { Request, Response } from 'express';
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  NotAuthorizeError,
} from '@picktronics/common';
import { body } from 'express-validator';
import { Product } from '../models/product';
import { ProductUpdatedPublisher } from '../events/publisher/product-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/products/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== product.userId) {
      throw new NotAuthorizeError();
    }

    product.set({
      title: req.body.title,
      price: req.body.price,
    });
    await product.save();

    new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id!,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
    });

    res.send(product);
  }
);

export { router as updateProductRouter };
