import { User } from "src/user/domain/model/User";
import { UserEntity } from "../persistence/UserEntity";

export interface IUserMapperEntity {
  toModel(userDB: UserEntity): User
  toEntity(user: User): UserEntity
}