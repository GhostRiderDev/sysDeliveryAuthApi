import { Test, TestingModule } from '@nestjs/testing';
import { HashPasswordInterceptor } from '../handler/HashPassword.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SignupUserDto } from 'src/user/application/dto/SignupUser.dto';
import { UserDetailsDto } from 'src/user/application/dto/UserDetails.dto';
import { AuthController } from './AuthController';
import { IAuthService, IAuthServiceToken } from 'src/user/application/service/IAuthService';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: IAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: IAuthServiceToken,
          useValue: {
            signupUser: jest.fn(),
          },
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: HashPasswordInterceptor,
        },
        {
          provide: "CACHE_MANAGER",
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        }
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<IAuthService>(IAuthServiceToken);
  });

  describe('signup', () => {
    it('should return user details on successful signup', async () => {
      const signupUserDto: SignupUserDto = {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const userDetailsDto: UserDetailsDto = {
        id: 'uuid',
        username: 'john_doe',
        email: 'john.doe@example.com',
        role: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(authService, 'signupUser').mockResolvedValue(userDetailsDto);

      const result = await authController.signup(signupUserDto);
      expect(result).toEqual(userDetailsDto);
    });

    it('should call signupUser with correct parameters', async () => {
      const signupUserDto: SignupUserDto = {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      await authController.signup(signupUserDto);
      expect(authService.signupUser).toHaveBeenCalledWith(signupUserDto);
    });
  });
});
