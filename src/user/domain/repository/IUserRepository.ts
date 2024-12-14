import { User } from "../model/User";

export interface IUserRepository {
  saveUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
}