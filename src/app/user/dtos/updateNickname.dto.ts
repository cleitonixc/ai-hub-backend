import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNicknameDto {
  @ApiProperty({
    description: 'Novo nickname do usuário',
    example: 'Cleiton'
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;
} 