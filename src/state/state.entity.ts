import { AddressEntity } from '../address/address.entity';
import { CityEntity } from '../city/city.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('states')
export class StateEntity {
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'abbreviation', nullable: false })
  abbreviation: string;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  //codigo do state
  @Column({ name: 'state_code', nullable: false })
  stateCode: string;

  //prefixos de telefone json
  @Column({ name: 'phone_prefixes', nullable: false, type: 'json' })
  phonePrefixes: string[];

  @OneToMany(() => CityEntity, (city) => city.state)
  cities: CityEntity[];

  @OneToMany(() => AddressEntity, (address) => address.state)
  addresses: AddressEntity[];

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;
}
