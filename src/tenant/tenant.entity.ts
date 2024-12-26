import { AddressEntity } from '../address/address.entity';
import { UserEntity } from '../user/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tenant' })
export class TenantEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'cnpj', nullable: false, unique: true })
  cnpj: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'address_id', nullable: false })
  addressId: number;

  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;

  @OneToMany(() => UserEntity, (user) => user.tenant)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  users: UserEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @Column({ name: 'is_deleted', nullable: false, default: false })
  isDeleted: boolean;

  @Column({ name: 'is_blocked', nullable: false, default: false })
  isBlocked: boolean;

  @Column({ name: 'is_verified', nullable: false, default: false })
  isVerified: boolean;

  @Column({ name: 'is_suspended', nullable: false, default: false })
  isSuspended: boolean;

  // @OneToMany(() => CategoryEntity, (category) => category.tenant)
  // categories: CategoryEntity[];
}
