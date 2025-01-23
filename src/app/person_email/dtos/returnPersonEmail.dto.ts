import { PersonEmailType, PersonEmailSystemType } from 'src/entities/personEmail.entity';
import { PersonEmailEntity } from 'src/entities/personEmail.entity';
import { PersonEntity } from 'src/entities/person.entity';
export class ReturnPersonEmailDto {
  id: string;
  email: string;
  isDefault: boolean;
  isVerified: boolean;
  type: PersonEmailType;
  systemType: PersonEmailSystemType[];
  person: PersonEntity;

  constructor(personEmail: PersonEmailEntity) {
    this.id = personEmail.id;
    this.email = personEmail.email;
    this.isDefault = personEmail.isDefault;
    this.isVerified = personEmail.isVerified;
    this.type = personEmail.type;
    this.systemType = personEmail.systemType;
    this.person = personEmail.person;
  }
}
