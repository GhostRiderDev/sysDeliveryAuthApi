import { HttpStatus } from '@nestjs/common';
import { Constant } from '../enum/Constant';

export class UserAlreadyExist extends Error {
  statusCode = HttpStatus.CONFLICT;

  constructor(message: string = Constant.USER_ALREADY_EXISTS) {
    super(message);
  }
}
