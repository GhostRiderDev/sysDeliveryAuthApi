import { Body, Controller, Inject, Post, UseFilters } from "@nestjs/common";
import { SignupUserDto } from "src/user/application/dto/SignupUser.dto";
import { UserDetailsDto } from "src/user/application/dto/UserDetails.dto";
import { IAuthService, IAuthServiceToken } from "src/user/application/service/IAuthService";
import { UserErrorHandlerFilter } from "../handler/UserErrorHandler.filter";

@Controller('auth')
@UseFilters(new UserErrorHandlerFilter())
export class AuthController {
  constructor(
    @Inject(IAuthServiceToken)
    private readonly authService: IAuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() userDto: SignupUserDto): Promise<UserDetailsDto> {
    return await this.authService.signupUser(userDto);
  }
}