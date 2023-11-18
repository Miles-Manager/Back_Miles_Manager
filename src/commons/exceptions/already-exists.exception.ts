import { HttpException, HttpStatus } from "@nestjs/common";

interface AlreadyExistsExceptionInterface {
  message?: string;
}

export class AlreadyExistsException extends HttpException {
  constructor({ message }: AlreadyExistsExceptionInterface) {
    super(message ?? "Already Exists", HttpStatus.UNPROCESSABLE_ENTITY);
  }
}