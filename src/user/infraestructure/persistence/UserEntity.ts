import { UserRole } from 'src/user/domain/enum/UserRole';
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false, length: 200, nullable: false })
  username: string;

  @Column({ unique: true, length: 200, nullable: false })
  email: string;

  @Column({ length: 200, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
