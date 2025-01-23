import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TeamMemberEntity } from './accountTeamMember.entity';
import { InvitationEntity } from './accountInvitation.entity';
import { ApiKeyEntity } from './accountApiKey.entity';
import { TeamMemberRole } from '../enums/team-member-role.enum';


@Entity('teams')
export class TeamEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'slug', nullable: false, unique: true })
  slug: string;

  @Column({ name: 'domain', nullable: true, unique: true })
  domain?: string;

  @Column({ 
    name: 'default_role',
    type: 'enum',
    enum: TeamMemberRole,
    default: TeamMemberRole.MEMBER
  })
  defaultRole: TeamMemberRole;

  @Column({ name: 'billing_id', nullable: true })
  billingId?: string;

  @Column({ name: 'billing_provider', nullable: true })
  billingProvider?: string;

  @OneToMany(() => TeamMemberEntity, member => member.team)
  members: TeamMemberEntity[];

  @OneToMany(() => InvitationEntity, invitation => invitation.team)
  invitations: InvitationEntity[];

  @OneToMany(() => ApiKeyEntity, apiKey => apiKey.team)
  apiKeys: ApiKeyEntity[];
}

