import { IUserRepository } from 'src/user/domain/repository/IUserRepository';
import { IUserMapperDtoModel } from '../../mapper/IUserMapperDtoModel';
import { AuthService } from '../AuthService';
import { User } from 'src/user/domain/model/User';
import { SignupUserDto } from '../../dto/SignupUser.dto';
import { UserRole } from 'src/user/domain/enum/UserRole';
import { UserDetailsDto } from '../../dto/UserDetails.dto';

jest.mock('src/user/domain/model/User');

describe('AuthService', () => {
  let authService: AuthService;
  let userMapper: IUserMapperDtoModel;
  let userRepository: IUserRepository;

  const userDetailsDto: UserDetailsDto = {
    id: 'uuid',
    username: 'olvadis',
    email: 'olvadis@gmail.com',
    role: UserRole.CLIENT,
    phone: '+57 1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    (User as jest.Mock).mockClear();

    userMapper = {
      toModel: jest.fn(
        (user: SignupUserDto, role: UserRole) =>
          new User(
            null,
            user.username,
            user.email,
            user.password,
            role,
            user.phone,
            null,
            null,
          ),
      ),
      toDto: jest.fn(() => userDetailsDto),
    };

    userRepository = {
      saveUser: jest.fn((user: User) =>
        Promise.resolve(
          new User(
            'uuid',
            user.username,
            user.email,
            user.password,
            user.role,
            user.phone,
            user.createdAt,
            user.updatedAt,
          ),
        ),
      ),
      findUserByEmail: jest.fn(),
      findUserById: jest.fn(),
    };

    authService = new AuthService(userMapper, userRepository);
  });

  describe('signupUser', () => {
    it('should save user with default role', async () => {
      const userDto: SignupUserDto = {
        email: 'olvadis@gmail.com',
        password: 'password',
        username: 'olvadis',
        phone: '+57 1234567890',
      };

      const user: User = new User(
        null,
        userDto.username,
        userDto.email,
        userDto.password,
        UserRole.CLIENT,
        userDto.phone,
        null,
        null,
      );

      (userMapper.toModel as jest.Mock).mockReturnValue(user);
      (userRepository.saveUser as jest.Mock).mockResolvedValue(user);
      (userMapper.toDto as jest.Mock).mockReturnValue(userDetailsDto);

      const result = await authService.signupUser(userDto);

      expect(userMapper.toModel).toHaveBeenCalledWith(userDto, UserRole.CLIENT);
      expect(userRepository.saveUser).toHaveBeenCalledWith(user);
      expect(userMapper.toDto).toHaveBeenCalledWith(user);
      expect(result).toEqual(userDetailsDto);
    });
  });
});
