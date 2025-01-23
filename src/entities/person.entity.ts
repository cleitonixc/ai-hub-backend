import { AddressEntity } from '../entities/address.entity';
import { BaseEntity } from './base.entity';
import { PersonDocumentEntity } from './personDocument.entity';
import { PersonEmailEntity } from './personEmail.entity';
import { PersonPhoneEntity } from './personPhone.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity({ name: 'persons' })
export class PersonEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // type enum
  @Column({ name: 'type', nullable: false, type: 'enum', enum: PersonType })
  personType: PersonType;

  // system type enum multiple select
  @Column({ name: 'system_type', nullable: false, type: 'enum', enum: PersonSystemType, array: true })
  personSystemType: PersonSystemType[];

  @Column({ name: 'person_name', nullable: false })
  personName: string;

  @OneToMany(() => PersonPhoneEntity, (personPhones) => personPhones.person)
  personPhones: PersonPhoneEntity[];

  @OneToMany(() => PersonEmailEntity, (personEmails) => personEmails.person)
  personEmails: PersonEmailEntity[];

  @OneToMany(() => PersonDocumentEntity, (personDocuments) => personDocuments.person)
  personDocuments: PersonDocumentEntity[];

  // endereço
  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'addressBuilding_id', referencedColumnName: 'id' })
  addressBuilding: AddressEntity;

  // gender enum
  @Column({ name: 'gender', nullable: false, type: 'enum', enum: PersonGender})
  personGender: PersonGender;

  //TODO: add birthDate
  @Column({name: 'birth_date', type: 'date', nullable: true, default: null})
  personBirthDate?: Date
}
