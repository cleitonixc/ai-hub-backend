import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorSchema, UnauthorizedSchema } from 'src/swagger/swagger.schemas';
import { RefreshTokenDto } from './dtos/refreshToken.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('AuthController initialized');
  }

  @ApiOperation({ 
    summary: 'Realizar login do usuário',
    description: 'Realiza a autenticação do usuário e retorna os tokens de acesso'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário logado com sucesso',
    type: ReturnLoginDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválidos',
    schema: UnauthorizedSchema,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    schema: ErrorSchema,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    console.log('loginDto', loginDto);
    return this.authService.login(loginDto);
  }

  @Post('/refresh')
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto): Promise<ReturnLoginDto> {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('/logout')
  async logout(@Body() { refreshToken }: RefreshTokenDto): Promise<{ message: string }> {
    return this.authService.logout(refreshToken);
  }

}

