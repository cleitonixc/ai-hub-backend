import { AddressEntity } from './address.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'tenants' })
export class TenantEntity {
  
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', nullable: false })
  tenantName: string;

  @Column({ name: 'phone', nullable: false })
  tenantPhone: string;

  @Column({ name: 'tenant_email', nullable: false })
  tenantEmail: string;

  @Column({ name: 'is_blocked', nullable: false, default: false })
  isBlocked: boolean;

  @Column({ name: 'is_verified', nullable: false, default: false })
  isVerified: boolean;

  @Column({ name: 'is_suspended', nullable: false, default: false })
  isSuspended: boolean;

  @CreateDateColumn({name: 'created_at', nullable: false, default: new Date()})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', nullable: true, default: null})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true, default: null})
  deletedAt: Date;

  @Column({ name: 'is_default', nullable: false, default: false })
  isDefault: boolean;

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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  // @OneToMany(() => CategoryEntity, (category) => category.tenant)
  // categories: CategoryEntity[];
}
