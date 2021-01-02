import { Publisher, Subjects, ProductUpdatedEvent } from '@picktronics/common';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}
