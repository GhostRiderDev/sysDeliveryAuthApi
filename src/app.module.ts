import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './user/infraestructure/config/Datasource';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './user/infraestructure/config/Env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UserModule,
    CacheModule.register({
      ttl: 5,
      max: 10,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 30000, // 30 seconds
        limit: 10,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
