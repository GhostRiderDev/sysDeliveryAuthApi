import { User } from 'src/user/domain/model/User';
import { UserEntity } from '../persistence/UserEntity';
import { IUserMapperEntity } from './IUserMapperEntity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapperEntity implements IUserMapperEntity {
  toModel(userDB: UserEntity): User {
    return new User(
      userDB.id,
      userDB.username,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.phone,
      userDB.createdAt,
      userDB.updatedAt,
    );
  }

  toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.username = user.username;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.role = user.role;
    userEntity.phone = user.phone;
    return userEntity;
  }
}
