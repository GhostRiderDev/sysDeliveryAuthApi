import { Constant } from "../enum/Constant";

export class UserNotFound extends Error {
  constructor(message: string = Constant.USER_NOT_FOUND) {
    super(message);
  }
}
