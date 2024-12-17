import { SignupUserDto } from '../dto/SignupUser.dto';
import { UserDetailsDto } from '../dto/UserDetails.dto';

export const IAuthServiceToken = 'IAuthService';

export interface IAuthService {
  signupUser(userDto: SignupUserDto): Promise<UserDetailsDto>;
}
