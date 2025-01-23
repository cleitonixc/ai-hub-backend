import { IsNotEmpty, IsString, IsBoolean, IsEnum } from 'class-validator';
import { PersonEmailType, PersonEmailSystemType } from 'src/entities/personEmail.entity';

export class UpdatePersonEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;

  @IsNotEmpty()
  @IsEnum(PersonEmailType)
  type: PersonEmailType;

  @IsNotEmpty()
  @IsEnum(PersonEmailSystemType)
  systemType: PersonEmailSystemType[];

  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;
}
