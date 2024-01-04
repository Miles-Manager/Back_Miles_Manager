import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token =
      this.#extractTokenFromHeader(request) ?? request.cookies['token'];

    if (!token) {
      throw new UnauthorizedException();
    }

    const { user } = this.jwtService.decode(token);

    return requiredRoles.some((role) => user.role?.includes(role));
  }

  #extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      return undefined;
    }

    const [type, token] = authorizationHeader?.split(' ');

    return type === 'Bearer' ? token : undefined;
  }
}
