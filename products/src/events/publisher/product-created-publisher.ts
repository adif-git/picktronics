import { Publisher, Subjects, ProductCreatedEvent } from '@picktronics/common';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
