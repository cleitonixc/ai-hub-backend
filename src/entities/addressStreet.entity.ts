import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { AddressEntity } from "./address.entity";

@Entity({ name: 'address_streets' })
export class AddressStreetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ name: 'street_name', type: 'varchar', nullable: true, default: null })
  streetName: string;

  //TODO: add osmId
  @Column({name: 'osm_id', type: 'int', nullable: true, default: null})
  osmId?: number

  @OneToMany(() => AddressEntity, (address) => address.street)
  addresses: AddressEntity[];
}
