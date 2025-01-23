import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('verification_tokens')
export class AccountVerificationTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'identifier', nullable: false })
  identifier: string;

  @Column({ name: 'token', nullable: false, unique: true })
  token: string;

  @Column({ name: 'expires', nullable: false })
  expires: Date;
}
