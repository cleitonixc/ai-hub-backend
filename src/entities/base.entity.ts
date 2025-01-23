import { Column, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, UpdateDateColumn, Index } from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { UserEntity } from './user.entity';


export class BaseEntity {
  
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
  @Column({ name: 'created_by', type: 'int', nullable: false })
  createdBy: number;

  //user who updated the record
  @Column({ name: 'updated_by', type: 'int', nullable: true, default: null })
  updatedBy?: number;

  //user who deleted the record
  @Column({ name: 'deleted_by', type: 'int', nullable: true, default: null })
  deletedBy?: number;

  //tenant id
  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: TenantEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;
}
