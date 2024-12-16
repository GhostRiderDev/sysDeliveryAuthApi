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
      userDB.createdAt,
      userDB.role,
      userDB.updatedAt,
    );
  }

  toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.username = user.username;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.role = user.role;
    return userEntity;
  }
}
