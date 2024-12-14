import { User } from "src/user/domain/model/User";
import { UserEntity } from "../persistence/UserEntity";
import { IUserMapperEntity } from "./IUserMapperEntity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserMapperEntity  implements IUserMapperEntity {

  toModel(userDB: UserEntity): User {
    return new User(
      userDB.id,
      userDB.username,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.createdAt,
      userDB.updatedAt,
    );
  }

  toEntity(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.username,
      user.email,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }
}