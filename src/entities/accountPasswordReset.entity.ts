import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('password_resets')
export class PasswordResetEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'token', nullable: false, unique: true })
  token: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'expires_at', nullable: false })
  expiresAt: Date;
}
