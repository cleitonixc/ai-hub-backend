import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/app/auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorators';
import { UserType } from 'src/app/user/enum/user-types.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    
    const { authorization } = context.switchToHttp().getRequest().headers;
    
    const loginPayload: LoginPayloadDto | undefined = await this.jwtService.verifyAsync(
      authorization,
      {
        secret: process.env.JWT_SECRET,
      },
    ).catch(() => undefined);

    if (!loginPayload) {
      return false;
    }
    
    return requiredRoles.some((role) => loginPayload.type === role);
  }
}
