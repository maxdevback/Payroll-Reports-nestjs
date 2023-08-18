import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('payroll')
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  SectorOfEconomics: string;

  @Column({ nullable: false })
  position: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  salaryInYear: number;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  experienceInYears: number;

  @Column('simple-array', { nullable: false, default: [] })
  AdditionalSkills: string[];

  @Column({ nullable: false, default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}
