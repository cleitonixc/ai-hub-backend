import { PersonEntity, PersonType, PersonSystemType, PersonGender } from 'src/entities/person.entity';  

export class ReturnPersonDto {
  id: string;
  personName: string;
  personType: PersonType;
  personSystemType: PersonSystemType[];
  personGender: PersonGender;
  personBirthDate: Date;
  tenantId: number;
  constructor(person: PersonEntity) {
    this.id = person.id;
    this.personName = person.personName;
    this.personType = person.personType;
    this.personSystemType = person.personSystemType;
    this.personGender = person.personGender;
    this.personBirthDate = person.personBirthDate;
  }
}
