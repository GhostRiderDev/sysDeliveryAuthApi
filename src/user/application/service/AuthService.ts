import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IUserMapperDtoModel,
  IUserMapperDtoModelToken,
} from '../mapper/IUserMapperDtoModel';
import { IAuthService } from './IAuthService';
import { SignupUserDto } from '../dto/SignupUser.dto';
import { UserDetailsDto } from '../dto/UserDetails.dto';
import {
  IUserRepository,
  IUserRepositoryToken,
} from 'src/user/domain/repository/IUserRepository';
import { UserRole } from 'src/user/domain/enum/UserRole';
import { SigninUserDto } from '../dto/SigninUser.dto';
import { UserNotFound } from 'src/user/domain/error/UserNotFound';
import { Constant } from 'src/user/domain/enum/Constant';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../dto/Token.dto';
import { Response } from 'express';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserMapperDtoModelToken)
    private readonly userMapper: IUserMapperDtoModel,
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signupUser(userDto: SignupUserDto): Promise<UserDetailsDto> {
    const user = this.userMapper.toModel(userDto, UserRole.CLIENT);
    const newUser = await this.userRepository.saveUser(user);
    return this.userMapper.toDto(newUser);
  }

  async signinUser(userDto: SigninUserDto, response: Response): Promise<TokenDto> {
    const userDB = await this.userRepository.findUserByEmail(userDto.email);
    if (!userDB) {
      throw new UserNotFound(Constant.USER_NOT_FOUND);
    }

    const isPasswordValid = bcrypt.compare(userDto.password, userDB.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(Constant.INVALID_PASSWORD);
    }

    const payload = {
      sub: userDB.id,
      role: userDB.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    response.cookie('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    const res: TokenDto = {
      accessToken,
    };

    return res;
  }
}
