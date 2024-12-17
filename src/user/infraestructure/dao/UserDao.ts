import {
  IUserMapperEntity,
  IUserMapperEntityToken,
} from '../mapper/IUserMapperEntity';
import { UserEntity } from '../persistence/UserEntity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domain/repository/IUserRepository';
import { User } from 'src/user/domain/model/User';
import { UserAlreadyExist } from 'src/user/domain/error/UserAlreadyExist';
import { UserNotFound } from 'src/user/domain/error/UserNotFound';

@Injectable()
export class UserDao implements IUserRepository {
  constructor(
    @Inject(IUserMapperEntityToken)
    private readonly userMapper: IUserMapperEntity,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async saveUser(user: User): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userExists) {
      throw new UserAlreadyExist(
        `User with email ${user.email} already exists`,
      );
    }

    const userToSave = this.userMapper.toEntity(user);
    const userSaved = await this.userRepository.save(userToSave);
    return this.userMapper.toModel(userSaved);
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UserNotFound(`User with email ${email} not found`);
    }

    return this.userMapper.toModel(user);
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UserNotFound(`User with id ${id} not found`);
    }

    return this.userMapper.toModel(user);
  }
}
