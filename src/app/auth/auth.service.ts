import { UserService } from "src/app/user/user.service";
import { LoginDto } from "./dtos/login.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserEntity } from "src/entities/user.entity"; 
import { JwtService } from "@nestjs/jwt";
import { ReturnLoginDto } from "./dtos/returnLogin.dto";
import { LoginPayloadDto } from "./dtos/loginPayload.dto";
import { ReturnUserDto } from "src/app/user/dtos/returnUser.dto";
import { ReturnTenantDto } from "../tenant/dtos/returnTenant.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService, 
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {

    console.log('loginDto', loginDto);
    
      const user: UserEntity | undefined = await this.usersService
        .findUserByEmail(loginDto.email)
        .catch(() => undefined);

    console.log('user', user);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({...new LoginPayloadDto(user), type: user.type, tenants: user.userTenants?.map(ut => new ReturnTenantDto(ut.tenant)) || [] }),
      refreshToken: this.jwtService.sign({...new LoginPayloadDto(user), type: user.type, tenants: user.userTenants?.map(ut => new ReturnTenantDto(ut.tenant)) || []}, 
        { secret: process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME }),
      user: new ReturnUserDto(user),
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_TOKEN_SECRET });
      return this.login(decoded);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(refreshToken: string) {
    try {
      await this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_TOKEN_SECRET });
      console.log('Logout successful');
      return { message: 'Logout successful' };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }

}
