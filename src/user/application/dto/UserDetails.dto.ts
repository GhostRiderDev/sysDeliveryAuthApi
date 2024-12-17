export class UserDetailsDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly email: string,
    readonly role: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
