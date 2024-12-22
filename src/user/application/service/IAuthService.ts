import { Response } from 'express';
import { SigninUserDto } from '../dto/SigninUser.dto';
import { SignupUserDto } from '../dto/SignupUser.dto';
import { TokenDto } from '../dto/Token.dto';
import { UserDetailsDto } from '../dto/UserDetails.dto';

export const IAuthServiceToken = 'IAuthService';

export interface IAuthService {
  signupUser(userDto: SignupUserDto): Promise<UserDetailsDto>;
  signinUser(userDto: SigninUserDto, response: Response): Promise<TokenDto>;
}
