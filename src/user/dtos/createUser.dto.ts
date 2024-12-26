import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { UserType } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserType)
  type: UserType;
}
