
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./base.entity";
import { AddressEntity } from "./address.entity";

@Entity({ name: 'address_countries' })
export class AddressCountryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({name: 'country_name', type: 'varchar', nullable: true, default: null})
  countryName: string

  @OneToMany(() => AddressEntity, (address) => address.country)
  addresses: AddressEntity[];

  //TODO: add osmId
  @Column({name: 'osm_id', type: 'int', nullable: true, default: null})
  osmId?: number
}
