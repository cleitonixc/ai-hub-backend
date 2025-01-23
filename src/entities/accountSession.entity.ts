import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('sessions')
export class AccountSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'session_token', nullable: false, unique: true })
  sessionToken: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'expires', nullable: false })
  expires: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
