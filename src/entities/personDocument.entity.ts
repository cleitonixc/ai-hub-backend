import { BaseEntity } from './base.entity';
import { PersonEntity } from './person.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PersonDocumentType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
  RG = 'rg',
  CNH = 'cnh',
}

@Entity({ name: 'person_documents' })
export class PersonDocumentEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // document type
  @Column({ name: 'document_type', nullable: false, type: 'enum', enum: PersonDocumentType })
  documentType: PersonDocumentType;

  // document number
  @Column({ name: 'document_number', nullable: false })
  documentNumber: string;

  // document expiration date
  @Column({ name: 'document_expiration_date', nullable: true, default: null })
  documentExpirationDate?: Date;
  
  // person
  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person?: PersonEntity;

}
