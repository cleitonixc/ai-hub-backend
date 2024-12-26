import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    return this.authService.login(loginDto);
  }
}
