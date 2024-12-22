import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
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
import { SigninUserDto } from 'src/user/application/dto/SigninUser.dto';
import { TokenDto } from 'src/user/application/dto/Token.dto';
import { Response } from 'express';

@Controller(`api/v${API_VERSION ?? 1}/auth`)
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
  async signup(@Body() data: SignupUserDto): Promise<UserDetailsDto> {
    return await this.authService.signupUser(data);
  }

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signin(
    @Body() userDto: SigninUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenDto> {
    return this.authService.signinUser(userDto, response);
  }
}
