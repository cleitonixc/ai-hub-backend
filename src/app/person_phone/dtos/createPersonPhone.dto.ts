import { IsNotEmpty, IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { PersonPhoneType } from 'src/entities/personPhone.entity';
import { PersonEntity } from 'src/entities/person.entity';
export class CreatePersonPhoneDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(PersonPhoneType)
  phoneType: PersonPhoneType;

  //todo is default
  @IsOptional()
  @IsBoolean()
  isDefault: boolean; 

  @IsNotEmpty()
  @IsString()
  person: PersonEntity;

}