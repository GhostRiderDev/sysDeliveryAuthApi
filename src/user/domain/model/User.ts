import { UserRole } from '../enum/UserRole';

export class User {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly email: string,
    readonly password: string,
    readonly role: UserRole,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.role = role;
    this.updatedAt = updatedAt;
  }
}
