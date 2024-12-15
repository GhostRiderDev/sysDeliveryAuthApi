import { IsEmail } from 'class-validator';

export class SignupUserDto {
  /**
   * @example 'johndoe'
   * @minLength 4
   * @maxLength 20
   * @description Username must be unique and contain only letters and numbers
   */
  username: string;

  /**
   * @example 'John@gmai.com'
   * @minLength 2
   * @maxLength 20
   * @description First name must contain only letters
   */
  @IsEmail()
  email: string;

  /**
   * @example 'password123'
   * @minLength 8
   * @maxLength 20
   * @description Password must contain at least one uppercase letter, one lowercase letter and one number
   */
  password: string;
}
