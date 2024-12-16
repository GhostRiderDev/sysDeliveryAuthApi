import { Constant } from '../enum/Constant';

export class UserInvalid extends Error {
  statusCode = 400;

  constructor(message: string = Constant.INVALID_USER) {
    super(message);
  }
}
