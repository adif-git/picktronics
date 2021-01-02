import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from '@picktronics/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
