import { PersonEntity } from './person.entity';
import { TenantEntity } from './tenant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
export enum PersonEmailType {
  PERSONAL = 'personal',
  WORK = 'work',
  OTHER = 'other',
}

export enum PersonEmailSystemType {
  PRIMARY = 'primary',
  BILLING = 'billing',
  MARKETING = 'marketing',
  SUPPORT = 'support',
  OTHER = 'other',
}

@Entity({ name: 'person_emails' })
export class PersonEmailEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // email
  @Column({ name: 'email', nullable: false })
  email: string;

  // person
  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  //is default
  @Column({ name: 'is_default', nullable: false, default: false })
  isDefault: boolean;

  // is verified
  @Column({ name: 'is_verified', nullable: true, default: false })
  isVerified: boolean;

  // type enum
  @Column({ name: 'type', nullable: false, type: 'enum', enum: PersonEmailType })
  type: PersonEmailType;

  // system type enum multiple select
  @Column({ name: 'system_type', nullable: false, type: 'enum', enum: PersonEmailSystemType, array: true })
  systemType: PersonEmailSystemType[];
}
