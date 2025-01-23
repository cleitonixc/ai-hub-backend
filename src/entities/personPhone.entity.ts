import { PersonEntity } from './person.entity';
import { TenantEntity } from './tenant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
export enum PersonPhoneType {
  MOBILE = 'mobile',
  LANDLINE = 'landline',
  FAX = 'fax',
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
}

@Entity({ name: 'person_phones' })
export class PersonPhoneEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //phone
  @Column({ name: 'phone', nullable: false })
  phone: string;

  //phone type
  @Column({ name: 'phone_type', nullable: false, type: 'enum', enum: PersonPhoneType })
  phoneType: PersonPhoneType;

  //is default
  @Column({ name: 'is_default', nullable: false, default: false })
  isDefault: boolean;

  //person
  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;
}
