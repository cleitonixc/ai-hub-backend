import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'type', nullable: false })
  type: string;

  @Column({ name: 'provider', nullable: false })
  provider: string;

  @Column({ name: 'provider_account_id', nullable: false })
  providerAccountId: string;

  @Column({ name: 'refresh_token', nullable: true, type: 'text' })
  refreshToken?: string;

  @Column({ name: 'access_token', nullable: true, type: 'text' })
  accessToken?: string;

  @Column({ name: 'expires_at', nullable: true })
  expiresAt?: number;

  @Column({ name: 'token_type', nullable: true })
  tokenType?: string;

  @Column({ name: 'scope', nullable: true })
  scope?: string;

  @Column({ name: 'id_token', nullable: true, type: 'text' })
  idToken?: string;

  @Column({ name: 'session_state', nullable: true })
  sessionState?: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
