import { AddressEntity } from '../address/address.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'dealers' })
export class DealerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false, length: 100 })
  name: string;

  // enterprise document
  @Column({ name: 'enterprise_document', nullable: false, length: 14 })
  enterpriseDocument: string;

  @Column({ name: 'email', nullable: true, length: 100 })
  email: string;

  @Column({ name: 'phone', nullable: true, length: 11 })
  phone: string;

  @ManyToOne(() => AddressEntity, (address) => address.id)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @Column({ name: 'is_deleted', nullable: false, default: false })
  isDeleted: boolean;

  @Column({ name: 'created_at', nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: false, default: new Date() })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

}
