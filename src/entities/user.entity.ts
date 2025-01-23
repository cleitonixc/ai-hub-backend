import { AddressEntity } from './address.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { UserTenantEntity } from './userTenant.entity';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_ADMIN = 'super_admin'
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //type user
  @Column({ name: 'type', nullable: false, default: UserType.USER })
  type: UserType;

  @Column({ name: 'name', nullable: false, length: 100 })
  name: string;

  @Column({ name: 'nickname', nullable: true, length: 100 })
  nickname?: string;

  @Column({ name: 'email', nullable: false, length: 100, unique: true })
  email: string;

  //emailVerified at
  @Column({ name: 'email_verified_at', nullable: true, default: null })
  emailVerifiedAt?: Date;

  //  invalid_login_attempts Int       @default(0)
  @Column({ name: 'invalid_login_attempts', nullable: false, default: 0 })
  invalidLoginAttempts: number;

  //lockedAt               DateTime?
  @Column({ name: 'locked_at', nullable: true, default: null })
  lockedAt?: Date;

  @Column({ name: 'password', nullable: false, length: 100 })
  password: string;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: AddressEntity;

  @Column({ name: 'is_blocked', nullable: false, default: false })
  isBlocked: boolean;

  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;

  @Column({ name: 'is_super_admin', nullable: false, default: false })
  isSuperAdmin: boolean;

  // ultimo acesso
  @Column({ name: 'last_access', nullable: true, default: null })
  lastAccess?: Date;

  @CreateDateColumn({name: 'created_at', nullable: false, default: new Date()})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', nullable: true, default: null})
  updatedAt?: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true, default: null})
  deletedAt?: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  //user who created the record
  @Column({ name: 'created_by', type: 'int', nullable: true, default: null })
  createdBy?: number;

  //user who updated the record
  @Column({ name: 'updated_by', type: 'int', nullable: true, default: null })
  updatedBy?: number;

  //user who deleted the record
  @Column({ name: 'deleted_by', type: 'int', nullable: true, default: null })
  deletedBy?: number;

  @OneToMany(() => UserTenantEntity, userTenant => userTenant.user)
  userTenants: UserTenantEntity[];

  // Método helper para obter o tenant padrão
  getDefaultTenant(): UserTenantEntity | undefined {
    return this.userTenants?.find(ut => ut.isDefault);
  }
}
