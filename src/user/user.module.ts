import { Module } from '@nestjs/common';
import { AuthController } from './infraestructure/controller/AuthController';
import { AuthService } from './application/service/AuthService';
import { UserDao } from './infraestructure/dao/UserDao';
import { UserMapperEntity } from './infraestructure/mapper/UserMapperEntity';
import { UserMapperDtoModel } from './application/mapper/UserMapperDtoModel';
import { UserEntity } from './infraestructure/persistence/UserEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IAuthServiceToken } from './application/service/IAuthService';
import { IUserRepositoryToken } from './domain/repository/IUserRepository';
import { IUserMapperDtoModelToken } from './application/mapper/IUserMapperDtoModel';
import { IUserMapperEntityToken } from './infraestructure/mapper/IUserMapperEntity';
import { HashPasswordInterceptor } from './infraestructure/handler/HashPassword.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  exports: [TypeOrmModule],
  providers: [
    {
      provide: IAuthServiceToken,
      useClass: AuthService,
    },
    {
      provide: IUserRepositoryToken,
      useClass: UserDao,
    },
    {
      provide: IUserMapperDtoModelToken,
      useClass: UserMapperDtoModel,
    },
    {
      provide: IUserMapperEntityToken,
      useClass: UserMapperEntity,
    },
    HashPasswordInterceptor,
  ],
})
export class UserModule {}
