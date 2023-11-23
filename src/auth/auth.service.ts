import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BcryptService } from 'src/commons/services/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from 'src/commons/exceptions/not-found.exception';
import { UnauthorizedException } from 'src/commons/exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  #bcryptService = new BcryptService();

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    const isPasswordValid = await this.#bcryptService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    const payload = { sub: user.id, user };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
