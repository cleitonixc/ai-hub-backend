import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Senha atual do usuário',
    example: 'senhaAtual123'
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novaSenha123'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
} 