import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './user/infraestructure/config/Datasource';
import { UserModule } from './user/user.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

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
    UserModule,
    CacheModule.register({
      ttl: 5,
      max: 10,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 120000, // 2 minutes
        limit: 10,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
