import { Publisher, Subjects, PaymentCreatedEvent } from '@picktronics/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
