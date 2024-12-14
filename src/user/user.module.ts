import { Module } from '@nestjs/common';
import { AuthController } from './infraestructure/controller/AuthController';
import { AuthService } from './application/service/AuthService';
import { UserDao } from './infraestructure/dao/UserDao';
import { UserMapperEntity } from './infraestructure/mapper/UserMapperEntity';
import { UserMapperDtoModel } from './application/mapper/UserMapperDtoModel';
import { UserEntity } from './infraestructure/persistence/UserEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  exports: [TypeOrmModule],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserDao,
    },
    {
      provide: 'IUserMapperDtoModel',
      useClass: UserMapperDtoModel,
    },
    {
      provide: 'IUserMapperEntity',
      useClass: UserMapperEntity,
    },
  ],
})
export class UserModule {}
