import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ 
    description: 'Email do usuário',
    example: 'arthur@example.com',
    required: true
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ 
    description: 'Senha do usuário',
    example: 'senhaSegura123',
    required: true,
    minLength: 6
  })
  password: string;
}