import { Constant } from '../enum/Constant';

export class UserAlreadyExist extends Error {
  statusCode = 409;

  constructor(message: string = Constant.USER_ALREADY_EXISTS) {
    super(message);
  }
}
