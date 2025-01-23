import { PersonPhoneType } from 'src/entities/personPhone.entity';
import { PersonPhoneEntity } from 'src/entities/personPhone.entity';
import { PersonEntity } from 'src/entities/person.entity';
export class ReturnPersonPhoneDto {
  id: string;
  phone: string;
  phoneType: PersonPhoneType;
  isDefault: boolean;
  person: PersonEntity;
  constructor(personPhone: PersonPhoneEntity) {
    this.id = personPhone.id;
    this.phone = personPhone.phone;
    this.phoneType = personPhone.phoneType;
    this.isDefault = personPhone.isDefault;
    this.person = personPhone.person;
  }
}
