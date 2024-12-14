export class SignupUserDto {
  constructor(
    readonly username: string,
    readonly email: string,
    readonly password: string,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
