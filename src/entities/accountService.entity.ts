import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('services')
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column('text', { name: 'features', array: true })
  features: string[];

  @Column({ name: 'image', nullable: false })
  image: string;

  @Column({ name: 'name', nullable: false })
  name: string;
}
