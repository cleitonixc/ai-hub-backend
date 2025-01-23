import { Column, Entity, OneToMany, Point, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AddressEntity } from './address.entity';

@Entity('address_locations')
export class AddressLocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  //TODO: add latitude and longitude postgres type point
  @Column({name: 'location', type: 'point', nullable: true, default: null})
  location?: Point

  //altitude
  @Column({name: 'elevation', type: 'decimal', precision: 10, scale: 8, nullable: true, default: null})
  elevation?: number;

  @OneToMany(() => AddressEntity, (address) => address.location)
  addresses: AddressEntity[];
}
