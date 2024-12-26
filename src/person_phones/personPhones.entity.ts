import { PersonEntity } from '../person/person.entity';
import { TenantEntity } from '../tenant/tenant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PersonPhoneType {
  MOBILE = 'mobile',
  LANDLINE = 'landline',
  FAX = 'fax',
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
}

@Entity('person_phones')
export class PersonPhonesEntity {
  //uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //phone
  @Column({ name: 'phone', nullable: false })
  phone: string;

  //phone mask
  @Column({ name: 'phone_mask', nullable: false })
  phoneMask: string;

  //phone type
  @Column({ name: 'phone_type', nullable: false, type: 'enum', enum: PersonPhoneType })
  phoneType: PersonPhoneType;

  //is default
  @Column({ name: 'is_default', nullable: false, default: false })
  isDefault: boolean;

  //is active
  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  //created at
  @Column({ name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  //updated at
  @Column({ name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  //deleted at
  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  //person
  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  //tenant
  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: TenantEntity;
}
