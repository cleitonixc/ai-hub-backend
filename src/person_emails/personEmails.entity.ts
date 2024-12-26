import { PersonEntity } from '../person/person.entity';
import { TenantEntity } from '../tenant/tenant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
export class PersonEmailsEntity {
  // id uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // email
  @Column({ name: 'email', nullable: false })
  email: string;

  // person
  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  // tenant
  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: TenantEntity;

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

  // is active
  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  //is default
  @Column({ name: 'is_default', nullable: false, default: false })
  isDefault: boolean;

  // is verified
  @Column({ name: 'is_verified', nullable: false, default: false })
  isVerified: boolean;

  // type enum
  @Column({ name: 'type', nullable: false, type: 'enum', enum: PersonEmailType })
  type: PersonEmailType;

  // system type enum multiple select
  @Column({ name: 'system_type', nullable: false, type: 'enum', enum: PersonEmailSystemType, array: true })
  systemType: PersonEmailSystemType[];
}
