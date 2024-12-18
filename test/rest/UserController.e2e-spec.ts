import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from 'src/user/user.module';
import {
  IAuthService,
  IAuthServiceToken,
} from 'src/user/application/service/IAuthService';
import { SignupUserDto } from 'src/user/application/dto/SignupUser.dto';
import { UserDetailsDto } from 'src/user/application/dto/UserDetails.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/infraestructure/persistence/UserEntity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { API_VERSION } from 'src/user/infraestructure/config/Env';
import 'src/user/infraestructure/config/Env';
import { UserAlreadyExist } from 'src/user/domain/error/UserAlreadyExist';
import { Constant } from 'src/user/domain/enum/Constant';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let mockAuthService: IAuthService;

  beforeAll(async () => {
    mockAuthService = {} as IAuthService;
    mockAuthService.signupUser = jest.fn();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(IAuthServiceToken)
      .useValue(mockAuthService)
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(jest.fn())
      .overrideInterceptor(CacheInterceptor)
      .useValue(jest.fn())
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should return http status code OK if register is success', async () => {
      // given

      const userToRegister: SignupUserDto = {
        email: 'olvadis@gmail.com',
        password: 'password',
        username: 'olvadis',
      };

      const userRegistered: UserDetailsDto = {
        id: '1',
        email: userToRegister.email,
        username: userToRegister.username,
        role: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedResponse = {
        ...userRegistered,
        createdAt: userRegistered.createdAt.toISOString(),
        updatedAt: userRegistered.updatedAt.toISOString(),
      };

      (mockAuthService.signupUser as jest.Mock).mockReturnValue(
        Promise.resolve(userRegistered),
      );

      // when
      const testRequest: request.Test = request(app.getHttpServer())
        .post(`/api/v${API_VERSION}/auth/signup`)
        .send(userToRegister);

      // then
      await testRequest.expect(201).expect(expectedResponse);
    });

    it('should return http status code BAD_REQUEST if email is already registered', async () => {
      // given

      const userToRegister: SignupUserDto = {
        email: 'olvadis@gmail.com',
        password: 'password',
        username: 'olvadis',
      };

      const expectedResponse = {
        statusCode: 409,
        message: Constant.USER_ALREADY_EXISTS,
      };

      (mockAuthService.signupUser as jest.Mock).mockImplementation(() => {
        throw new UserAlreadyExist(Constant.USER_ALREADY_EXISTS);
      });

      // when
      const testRequest: request.Test = request(app.getHttpServer())
        .post(`/api/v${API_VERSION}/auth/signup`)
        .send(userToRegister);

      // then
      await testRequest.expect(expectedResponse.statusCode).expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(expectedResponse));
      });
    });

    it('should return http status code BAD_REQUEST if validation fails', async () => {
      // given

      const userToRegister: Partial<SignupUserDto> = {
        email: 'caracolDeColores@gmail.com',
        password: 'password',
      };

      const expectedResponse = {
        statusCode: 400,
        message: 'Bad Request Exception',
      };

      // when
      const testRequest: request.Test = request(app.getHttpServer())
        .post(`/api/v${API_VERSION}/auth/signup`)
        .send(userToRegister);

      // then
      await testRequest.expect(expectedResponse.statusCode).expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(expectedResponse));
      });
    });

    it("should return http status code BAD_REQUEST if email doesn't have a valid format", async () => {
      // given
      const userToRegister: SignupUserDto = {
        email: 'olvadisgmail.com',
        password: 'password',
        username: 'olvadis',
      };

      const expectedResponse = {
        statusCode: 400,
        message: 'Bad Request Exception',
      };

      // when

      const testRequest: request.Test = request(app.getHttpServer())
        .post(`/api/v${API_VERSION}/auth/signup`)
        .send(userToRegister);

      // then

      await testRequest.expect(expectedResponse.statusCode).expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(expectedResponse));
      });
    });
  });
});
