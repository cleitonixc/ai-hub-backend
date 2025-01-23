import { UserEntity } from "src/entities/user.entity";
import { ReturnUserDto } from "src/app/user/dtos/returnUser.dto";
import { ApiProperty } from '@nestjs/swagger';

export class ReturnLoginDto {
  @ApiProperty({ 
    description: 'Token de acesso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({ 
    description: 'Token de atualização para renovar o token de acesso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken: string;

  @ApiProperty({ 
    description: 'Dados do usuário logado',
    type: ReturnUserDto
  })
  user: ReturnUserDto;

  constructor(userEntity: UserEntity) {
    this.accessToken = 'accessToken';
    this.refreshToken = 'refreshToken';
    this.user = new ReturnUserDto(userEntity);
  }
  
} 