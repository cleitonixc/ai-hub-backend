import { AddressEntity } from '../address/address.entity';
import { TenantEntity } from '../tenant/tenant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_ADMIN = 'super_admin',
}

@Entity('users')
export class UserEntity {
  //id do tipo uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //type user
  @Column({ name: 'type', nullable: false, default: UserType.USER })
  type: UserType;

  @Column({ name: 'name', nullable: false, length: 100 })
  name: string;

  @Column({ name: 'email', nullable: false, length: 100, unique: true })
  email: string;

  @Column({ name: 'password', nullable: false, length: 100 })
  password: string;

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];

  @ManyToOne(() => TenantEntity, (tenant) => tenant.users)
  tenant: TenantEntity;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @Column({ name: 'is_deleted', nullable: false, default: false })
  isDeleted: boolean;

  @Column({ name: 'is_blocked', nullable: false, default: false })
  isBlocked: boolean;

  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;

  @Column({ name: 'is_super_admin', nullable: false, default: false })
  isSuperAdmin: boolean;

  // ultimo acesso
  @Column({ name: 'last_access', nullable: true })
  lastAccess: Date;
}