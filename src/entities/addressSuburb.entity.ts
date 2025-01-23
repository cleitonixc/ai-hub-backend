import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { AddressEntity } from "./address.entity";

@Entity({ name: 'address_suburbs' })
export class AddressSuburbEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'suburb_name', type: 'varchar', nullable: true, default: null })
  name: string;

  @Column({name: 'osm_id', type: 'int', nullable: true, default: null})
  osmId?: number

  @OneToMany(() => AddressEntity, (address) => address.suburb)
  addresses: AddressEntity[];
} 