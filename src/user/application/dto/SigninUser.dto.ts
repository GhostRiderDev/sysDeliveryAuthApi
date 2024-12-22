import { PickType } from '@nestjs/swagger';
import { SignupUserDto } from './SignupUser.dto';

export class SigninUserDto extends PickType(SignupUserDto, [
  'email',
  'password',
] as const) {}
