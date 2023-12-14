import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllowAnon } from '../commons/decorators/allow-anon.decorator';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() { email, password }: SignInDTO) {
    return this.authService.signIn(email, password);
  }
}
