import { HttpException, HttpStatus } from '@nestjs/common';

interface NotFoundExceptionInterface {
  message?: string;
}

export class NotFoundException extends HttpException {
  constructor({ message }: NotFoundExceptionInterface) {
    super(message ?? 'Not Found', HttpStatus.NOT_FOUND);
  }
}
