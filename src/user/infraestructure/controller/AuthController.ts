import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SignupUserDto } from "src/user/application/dto/SignupUser.dto";
import { UserDetailsDto } from "src/user/application/dto/UserDetails.dto";
import { IAuthService } from "src/user/application/service/IAuthService";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() userDto: SignupUserDto): Promise<UserDetailsDto> {
    return await this.authService.signupUser(userDto);
  }
}