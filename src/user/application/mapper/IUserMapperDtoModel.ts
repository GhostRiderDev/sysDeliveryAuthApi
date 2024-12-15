import { User } from 'src/user/domain/model/User';
import { SignupUserDto } from '../dto/SignupUser.dto';
import { UserDetailsDto } from '../dto/UserDetails.dto';
import { UserRole } from 'src/user/domain/enum/UserRole';

export const IUserMapperDtoModelToken = 'IUserMapperDtoModel';

export interface IUserMapperDtoModel {
  toModel(dto: SignupUserDto, role: UserRole): User;
  toDto(model: User): UserDetailsDto;
}
