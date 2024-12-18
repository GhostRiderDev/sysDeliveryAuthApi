import { IUserMapperDtoModel } from './IUserMapperDtoModel';
import { SignupUserDto } from '../dto/SignupUser.dto';
import { UserDetailsDto } from '../dto/UserDetails.dto';
import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/user/domain/enum/UserRole';
import { User } from 'src/user/domain/model/User';

@Injectable()
export class UserMapperDtoModel implements IUserMapperDtoModel {
  toModel(dto: SignupUserDto, role: UserRole): User {
    return new User(
      null,
      dto.username,
      dto.email,
      dto.password,
      role,
      dto.phone,
      null,
      null,
    );
  }

  toDto(model: User): UserDetailsDto {
    return new UserDetailsDto(
      model.id,
      model.username,
      model.email,
      model.role,
      model.phone,
      model.createdAt,
      model.updatedAt,
    );
  }
}
