import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('subscriptions')
@Index(['customerId'])
export class SubscriptionEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'customer_id', nullable: false })
  customerId: string;

  @Column({ name: 'price_id', nullable: false })
  priceId: string;

  @Column({ name: 'start_date', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', nullable: false })
  endDate: Date;

  @Column({ name: 'cancel_at', nullable: true })
  cancelAt?: Date;
}
