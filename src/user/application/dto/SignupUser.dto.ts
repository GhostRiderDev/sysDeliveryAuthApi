import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { CountryCodeValidator } from 'src/user/infraestructure/constrain/ValidateCountryCode';

export class SignupUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '+57 3133245423' })
  @IsNotEmpty()
  @Validate(CountryCodeValidator)
  phone: string;
}
