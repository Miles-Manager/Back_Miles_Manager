import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AllowAnon } from '../commons/decorators/allow-anon.decorator';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signIn')
  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() { email, password }: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const signInResponse = await this.authService.signIn(email, password);

    const timeToExpire = new Date(
      this.jwtService.decode(signInResponse.accessToken)['exp'] * 1000,
    );

    response.cookie('token', signInResponse.accessToken, {
      expires: timeToExpire,
      httpOnly: true,
      // sameSite: 'none',
      // secure: true,
    });
    return signInResponse;
  }
}
