import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { hash as hashPassword } from 'bcrypt';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'regular', nullable: false, enum: ['regular', 'admin'] })
  role: 'regular' | 'admin';

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => User, (user) => user.id)
  user: User;

  @BeforeInsert()
  async encrypt() {
    console.log('before');
    this.password = await hashPassword(this.password, 10);
  }
}
