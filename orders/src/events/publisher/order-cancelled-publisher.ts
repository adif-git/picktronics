import { Subjects, Publisher, OrderCancelledEvent } from '@picktronics/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
