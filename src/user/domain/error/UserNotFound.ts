import { Constant } from "../enum/Constant";

export class UserNotFound extends Error {
  statusCode = 404;

  constructor(message: string = Constant.USER_NOT_FOUND) {
    super(message);
  }
}
