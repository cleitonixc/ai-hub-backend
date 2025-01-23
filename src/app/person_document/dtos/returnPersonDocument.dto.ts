import { PersonDocumentType } from 'src/entities/personDocument.entity';
import { UserEntity } from 'src/entities/user.entity';
import { PersonDocumentEntity } from 'src/entities/personDocument.entity';

export class ReturnPersonDocumentDto {
  id: string;
  documentType: PersonDocumentType;
  documentNumber: string;
  documentExpirationDate?: Date;
  user: UserEntity;
  constructor(personDocument: PersonDocumentEntity) {
    this.id = personDocument.id;
    this.documentType = personDocument.documentType;
    this.documentNumber = personDocument.documentNumber;
    this.documentExpirationDate = personDocument.documentExpirationDate;
    this.user = personDocument.user;
  }
}
