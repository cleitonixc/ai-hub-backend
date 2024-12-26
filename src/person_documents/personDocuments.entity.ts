import { PersonEntity } from '../person/person.entity';
import { TenantEntity } from '../tenant/tenant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PersonDocumentType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
  RG = 'rg',
  CNH = 'cnh',
}

@Entity({ name: 'person_documents' })
export class PersonDocumentsEntity {
  // id uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // document type
  @Column({ name: 'document_type', nullable: false, type: 'enum', enum: PersonDocumentType })
  documentType: PersonDocumentType;

  // document number
  @Column({ name: 'document_number', nullable: false })
  documentNumber: string;

  // document mask
  @Column({ name: 'document_mask', nullable: false })
  documentMask: string;

  // document expiration date
  @Column({ name: 'document_expiration_date', nullable: false })
  documentExpirationDate: Date;
  // is active
  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  // created at
  @Column({ name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // updated at
  @Column({ name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // deleted at
  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // is deleted
  @Column({ name: 'is_deleted', nullable: false, default: false })
  isDeleted: boolean;

  // person
  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  // tenant
  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: TenantEntity;
}
