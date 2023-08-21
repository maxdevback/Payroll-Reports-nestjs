import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('payroll')
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sector_of_economics: string;

  @Column({ nullable: false })
  position: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  salary_in_year: number;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  experience_in_years: number;

  @Column({ nullable: false, default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}
