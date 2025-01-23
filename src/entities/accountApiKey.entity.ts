import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { TeamEntity } from './accountTeam.entity';
import { BaseEntity } from './base.entity';

@Entity('api_keys')
@Index(['teamId'])
export class ApiKeyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'team_id', nullable: false })
  teamId: string;

  @Column({ name: 'hashed_key', nullable: false, unique: true })
  hashedKey: string;

  @Column({ name: 'expires_at', nullable: true })
  expiresAt?: Date;

  @Column({ name: 'last_used_at', nullable: true })
  lastUsedAt?: Date;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: TeamEntity;
}
