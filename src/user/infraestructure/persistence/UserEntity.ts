import { UserRole } from 'src/user/domain/enum/UserRole';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 200, nullable: false })
  username: string;

  @Column({ unique: true, length: 200, nullable: false })
  email: string;

  @Column({ length: 200, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
