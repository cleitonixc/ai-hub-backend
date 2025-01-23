import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressLocationEntity } from "./addressLocation.entity";
import { AddressStreetEntity } from "./addressStreet.entity";
import { AddressBuildingEntity } from "./addressBuilding.entity";
import { AddressCityEntity } from "./addressCity.entity";
import { AddressStateEntity } from "./addressState.entity";
import { AddressCountryEntity } from "./addressCountry.entity";
import { BaseEntity } from "./base.entity";
import { PersonEntity } from "./person.entity";
import { AddressSuburbEntity } from "./addressSuburb.entity";

@Entity({ name: 'addresses' })
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'number', type: 'varchar', nullable: false })
  number: string;

  @Column({ name: 'complement', type: 'varchar', nullable: true, default: null })
  complement: string;

  @ManyToOne(() => AddressStreetEntity)
  @JoinColumn({ name: 'street_id', referencedColumnName: 'id' })
  street: AddressStreetEntity;

  @ManyToOne(() => AddressBuildingEntity, { nullable: true })
  @JoinColumn({ name: 'building_id', referencedColumnName: 'id' })
  building?: AddressBuildingEntity;

  @ManyToOne(() => AddressCityEntity)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: AddressCityEntity;

  @ManyToOne(() => AddressStateEntity)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state: AddressStateEntity;

  @ManyToOne(() => AddressCountryEntity)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: AddressCountryEntity;

  //postal code
  @Column({ name: 'postal_code', nullable: false, type: 'varchar' })
  postalCode: string;

  @ManyToOne(() => AddressLocationEntity)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: AddressLocationEntity;

  @ManyToOne(() => AddressSuburbEntity)
  @JoinColumn({ name: 'suburb_id', referencedColumnName: 'id' })
  suburb: AddressSuburbEntity;

  @OneToMany(() => PersonEntity, (person) => person.address)
  persons: PersonEntity[];

  @OneToMany(() => PersonEntity, (person) => person.addressBuilding)
  personsBuilding: PersonEntity[];
}
