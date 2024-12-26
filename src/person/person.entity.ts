import { AddressEntity } from '../address/address.entity';
import { PersonPhonesEntity } from '../person_phones/personPhones.entity';
import { TenantEntity } from '../tenant/tenant.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Definição do enum PersonType
export enum PersonType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
  EXTRANGER = 'extranger',
}

//campo multiple select para os tipos de pessoas do sistema
export enum PersonSystemType {
  CUSTOMER = 'customer',
  TENANT = 'tenant',
  SUPPLIER = 'supplier',
  VENDOR = 'vendor',
}


export enum PersonGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity({ name: 'person' })
export class PersonEntity {
  // id uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // type enum
  @Column({ name: 'type', nullable: false, type: 'enum', enum: PersonType })
  type: PersonType;

  // system type enum multiple select
  @Column({ name: 'system_type', nullable: false, type: 'enum', enum: PersonSystemType, array: true })
  systemType: PersonSystemType[];

  @Column({ name: 'name', nullable: false })
  name: string;

  @OneToMany(() => PersonPhonesEntity, (personPhones) => personPhones.person)
  personPhones: PersonPhonesEntity[];

  // endereço
  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;

  //endereco de cobrança
  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: 'billing_address_id', referencedColumnName: 'id' })
  billingAddress: AddressEntity;

  // gender enum
  @Column({ name: 'gender', nullable: false, type: 'enum', enum: PersonGender})
  gender: PersonGender;

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: TenantEntity;

}
