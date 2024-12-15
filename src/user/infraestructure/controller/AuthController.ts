import {
  Body,
  Controller,
  Inject,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { SignupUserDto } from 'src/user/application/dto/SignupUser.dto';
import { UserDetailsDto } from 'src/user/application/dto/UserDetails.dto';
import {
  IAuthService,
  IAuthServiceToken,
} from 'src/user/application/service/IAuthService';
import { UserErrorHandlerFilter } from '../handler/UserErrorHandler.filter';
import { HashPasswordInterceptor } from '../handler/HashPassword.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { API_VERSION } from '../config/Env';

@Controller(`api/v${API_VERSION}/auth`)
@UseFilters(new UserErrorHandlerFilter())
@ApiTags('Auth')
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(
    @Inject(IAuthServiceToken)
    private readonly authService: IAuthService,
  ) {}

  @Post('/signup')
  @UseInterceptors(new HashPasswordInterceptor())
  async signup(@Body() userDto: SignupUserDto): Promise<UserDetailsDto> {
    return await this.authService.signupUser(userDto);
  }
}
