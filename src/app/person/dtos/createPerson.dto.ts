import { IsNotEmpty, IsString } from 'class-validator';
import { PersonEntity, PersonType, PersonSystemType, PersonGender } from 'src/entities/person.entity';

export class CreatePersonDto implements Partial<PersonEntity> {
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
