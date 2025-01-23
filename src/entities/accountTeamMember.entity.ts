import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Unique } from 'typeorm';
import { TeamEntity } from './accountTeam.entity';
import { BaseEntity } from './base.entity';
import { TeamMemberRole } from '../enums/team-member-role.enum';  

@Entity('team_members')
@Unique(['team', 'user'])
export class TeamMemberEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'team_id', nullable: false })
  teamId: string;

  @Column({ 
    name: 'role',
    type: 'enum',
    enum: TeamMemberRole,
    default: TeamMemberRole.MEMBER
  })
  role: TeamMemberRole;


  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: TeamEntity;
}
