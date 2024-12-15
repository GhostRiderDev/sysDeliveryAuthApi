import { HttpStatus } from "@nestjs/common";
import { Constant } from "../enum/Constant";

export class UserNotFound extends Error {
  statusCode = HttpStatus.NOT_FOUND;

  constructor(message: string = Constant.USER_NOT_FOUND) {
    super(message);
  }
}
