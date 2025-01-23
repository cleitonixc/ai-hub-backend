import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Unique } from 'typeorm';
import { TeamEntity } from './accountTeam.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { TeamMemberRole } from '../enums/team-member-role.enum';

@Entity('invitations')
@Unique(['teamId', 'email'])
@Index(['email'])
export class InvitationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'team_id', nullable: false })
  teamId: string;

  @Column({ name: 'email', nullable: true })
  email?: string;

  @Column({ 
    name: 'role',
    type: 'enum',
    enum: TeamMemberRole,
    default: TeamMemberRole.MEMBER,
  })
  role: TeamMemberRole;

  @Column({ name: 'token', nullable: false, unique: true })
  token: string;

  @Column({ name: 'expires', nullable: false })
  expires: Date;

  @Column({ name: 'invited_by', nullable: false })
  invitedBy: string;

  @Column({ name: 'sent_via_email', default: true })
  sentViaEmail: boolean;

  @Column('text', { name: 'allowed_domains', array: true, default: [] })
  allowedDomains: string[];

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invited_by', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: TeamEntity;
}
