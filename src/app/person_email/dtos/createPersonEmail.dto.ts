import { IsNotEmpty, IsString, IsBoolean, IsEnum } from 'class-validator';
import { PersonEmailType, PersonEmailSystemType } from 'src/entities/personEmail.entity';

export class CreatePersonEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  personId: string;

  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;

  @IsNotEmpty()
  @IsEnum(PersonEmailType)
  type: PersonEmailType;

  @IsNotEmpty()
  @IsEnum(PersonEmailSystemType)
  systemType: PersonEmailSystemType[];
}
