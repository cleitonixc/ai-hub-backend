import { CityEntity } from '../city/city.entity';
import { DealerEntity } from '../dealer/dealer.entity';
import { StateEntity } from '../state/state.entity';
import { UserEntity } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  map(arg0: (address: any) => import("./dtos/returnAddress.dto").ReturnAddressDto): import("./dtos/returnAddress.dto").ReturnAddressDto[] {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'number', nullable: true })
  number: string;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'zip_code', nullable: false })
  zipCode: string;

  @ManyToOne(() => CityEntity, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: CityEntity;

  //state.id foreign key column stateId
  @ManyToOne(() => StateEntity, (state) => state.addresses)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state?: StateEntity;

  //user.id foreign key column userId
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => DealerEntity, (dealer) => dealer.address)
  dealer: DealerEntity;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;
}
