import { IsOptional, IsBoolean, IsEnum, IsString } from 'class-validator';
import { PersonPhoneType } from 'src/entities/personPhone.entity';
import { PersonEntity } from 'src/entities/person.entity';
export class UpdatePersonPhoneDto {
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;

  @IsOptional()
  @IsEnum(PersonPhoneType)
  phoneType: PersonPhoneType;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  person: PersonEntity;
}
