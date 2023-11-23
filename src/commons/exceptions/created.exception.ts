import { HttpException, HttpStatus } from '@nestjs/common';

interface CreatedExceptionInterface<T> {
  object?: T;
}

export class CreatedException<G> extends HttpException {
  constructor({ object }: CreatedExceptionInterface<G>) {
    super(object ?? 'Created', HttpStatus.CREATED);
  }
}
