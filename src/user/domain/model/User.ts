import { isEmpty } from 'class-validator';
import { UserRole } from '../enum/UserRole';
import { UserInvalid } from '../error/UserInvalid';
import { Constant } from '../enum/Constant';

export class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly phone: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    role: UserRole,
    phone: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.validNonEmpty(username);
    this.validNonEmpty(email);
    this.validNonEmpty(password);
    this.validNonEmpty(role);
    this.validNonEmpty(phone);
    this.validRole(role);

    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.role = role;
    this.phone = phone;
    this.updatedAt = updatedAt;
  }

  validNonEmpty(value: string) {
    if (isEmpty(value)) {
      throw new UserInvalid(Constant.INVALID_USER);
    }
  }

  validRole(role: UserRole) {
    if (!Object.values(UserRole).includes(role)) {
      throw new UserInvalid(Constant.INVALID_USER);
    }
  }
}
