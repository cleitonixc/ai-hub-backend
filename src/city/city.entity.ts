import { AddressEntity } from '../address/address.entity';
import { StateEntity } from '../state/state.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Point,
  JoinColumn,
} from 'typeorm';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'state_id', nullable: false })
  stateId: number;

  @Column({ name: 'city_code', nullable: false })
  cityCode: string;

  @Column({ name: 'lat_lon', nullable: true, type: 'point' })
  latLon: Point;

  //Código TOM (SEFAZ)
  @Column({ name: 'tom_code', nullable: true })
  tomCode: string;

  @ManyToOne(() => StateEntity, (state) => state.id)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state: StateEntity;

  @OneToMany(() => AddressEntity, (address) => address.city)
  addresses: AddressEntity[];

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

}
