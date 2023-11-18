import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { AllowAnon } from '../commons/decorators/allow-anon.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signIn')
  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() { email, password }: SignInDTO) {
    return this.authService.signIn(email, password);
  }
}
