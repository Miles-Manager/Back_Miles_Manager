import { HttpException, HttpStatus } from "@nestjs/common";

interface UnauthorizedExceptionInterface {
  message?: string;
}

export class UnauthorizedException extends HttpException {
  constructor({ message }: UnauthorizedExceptionInterface) {
    super(message ?? "Unauthorized", HttpStatus.UNAUTHORIZED);
  }
}