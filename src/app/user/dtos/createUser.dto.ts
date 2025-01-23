import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { UserType } from 'src/entities/user.entity';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsOptional()
  @IsEnum(UserType, {
    message: 'type must be one of the following values: admin, user, super_admin'
  })
  type?: UserType;
  
  @IsOptional()
  tenantId?: number;
}
