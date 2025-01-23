
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'address_cities' })
export class AddressCityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({name: 'city_name', type: 'varchar', nullable: true, default: null})
  cityName: string

  @Column({name: 'city_code', type: 'varchar', nullable: true, default: null})
  cityCode: string

  @Column({name: 'tom_code', type: 'varchar', nullable: true, default: null})
  tomCode: string

  @OneToMany(() => AddressEntity, (address) => address.city)
  addresses: AddressEntity[];

  //TODO: add osmId
  @Column({name: 'osm_id', type: 'int', nullable: true, default: null})
  osmId?: number
}
