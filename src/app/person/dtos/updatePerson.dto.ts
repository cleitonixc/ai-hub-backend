import { IsNotEmpty, IsString } from 'class-validator';
import { PersonType, PersonSystemType, PersonGender } from 'src/entities/person.entity';
export class UpdatePersonDto {
  @IsNotEmpty()
  @IsString()
  personName: string;

  @IsNotEmpty()
  @IsString()
  personType: PersonType;

  @IsNotEmpty()
  @IsString()
  personSystemType: PersonSystemType[];

  @IsNotEmpty()
  @IsString()
  personGender: PersonGender;

  @IsNotEmpty()
  @IsString()
  personBirthDate: Date;
}
