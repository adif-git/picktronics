import { Publisher, Subjects, OrderCreatedEvent } from '@picktronics/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
