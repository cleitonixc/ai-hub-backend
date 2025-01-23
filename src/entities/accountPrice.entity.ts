import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ServiceEntity } from './accountService.entity';
import { BaseEntity } from './base.entity';

@Entity('prices')
export class PriceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'billing_scheme', nullable: false })
  billingScheme: string;

  @Column({ name: 'currency', nullable: false })
  currency: string;

  @Column({ name: 'service_id', nullable: false })
  serviceId: string;

  @Column({ name: 'amount', nullable: true })
  amount?: number;

  @Column({ name: 'metadata', type: 'jsonb', nullable: false })
  metadata: Record<string, any>;

  @Column({ name: 'type', nullable: false })
  type: string;

  @ManyToOne(() => ServiceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service: ServiceEntity;
}
