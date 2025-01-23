
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { AddressEntity } from "./address.entity";

@Entity({ name: 'address_states' })
export class AddressStateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({name: 'state_name', type: 'varchar', nullable: true, default: null})
  stateName: string

  @OneToMany(() => AddressEntity, (address) => address.state)
  addresses: AddressEntity[];

  @Column({name: 'state_code', type: 'varchar', nullable: true, default: null})
  stateCode: string;

  @Column({name: 'phone_prefixes', type: 'varchar', array: true, nullable: true, default: null})
  phonePrefixes: string[];

  @Column({name: 'abbreviation', type: 'varchar', nullable: true, default: null})
  abbreviation: string;

  @Column({name: 'osm_id', type: 'int', nullable: true, default: null})
  osmId?: number
}