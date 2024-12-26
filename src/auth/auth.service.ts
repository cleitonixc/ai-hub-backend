import { UserService } from "../user/user.service";
import { LoginDto } from "./dtos/login.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserEntity } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ReturnLoginDto } from "./dtos/returnLogin.dto";
import { LoginPayloadDto } from "./dtos/loginPayload.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService, 
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.usersService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({...new LoginPayloadDto(user), type: user.type}),
      refreshToken: this.jwtService.sign({...new LoginPayloadDto(user), type: user.type}, 
        { secret: process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME }),
      user: user
    }
  }
}
