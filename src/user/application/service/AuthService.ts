import { Inject, Injectable } from '@nestjs/common';
import { IUserMapperDtoModel } from '../mapper/IUserMapperDtoModel';
import { IAuthService } from './IAuthService';
import { SignupUserDto } from '../dto/SignupUser.dto';
import { UserDetailsDto } from '../dto/UserDetails.dto';
import { IUserRepository } from 'src/user/domain/repository/IUserRepository';
import { UserRole } from 'src/user/domain/enum/UserRole';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserMapperDtoModel')
    private readonly userMapper: IUserMapperDtoModel,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async signupUser(userDto: SignupUserDto): Promise<UserDetailsDto> {
    const user = this.userMapper.toModel(userDto, UserRole.CLIENT);
    const newUser = await this.userRepository.saveUser(user);
    return this.userMapper.toDto(newUser);
  }
}