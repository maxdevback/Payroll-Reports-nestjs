import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './entities/payroll.entity';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { User } from 'src/user/entities/user.entity';
import { QueryGetPayrollDto } from './dto/query-get-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepo: Repository<Payroll>,
  ) {}
  async create(createPayrollDto: CreatePayrollDto, user: User) {
    const payroll = this.payrollRepo.create(createPayrollDto);
    payroll.user = user;
    console.log(payroll);
    return await this.payrollRepo.save(payroll);
  }
  async approve(payrollId: number) {
    const payroll = await this.payrollRepo.findOne({
      where: { id: payrollId },
    });
    if (!payroll)
      throw new NotFoundException('Payroll with that id dose not exist');
    if (payroll.approved)
      throw new ConflictException('Payroll already approved');
    payroll.approved = true;
    return await this.payrollRepo.save(payroll);
  }

  async findAll({
    sector_of_economics,
    position,
    country,
    age,
    experience_in_years,
  }: QueryGetPayrollDto) {
    return await this.payrollRepo
      .createQueryBuilder('payroll')
      .where('payroll.sector_of_economics = :sector_of_economics', {
        sector_of_economics,
      })
      .andWhere('payroll.approved = true')
      .andWhere('payroll.position = :position', { position })
      .andWhere('payroll.country = :country', { country })
      .andWhere('payroll.age - :age BETWEEN -5 AND 5', { age })
      .andWhere(
        'payroll.experience_in_years - :experience_in_years BETWEEN -2 AND 2',
        { experience_in_years },
      )
      .getRawMany();
  }

  async findOne(payrollId: number) {
    const payroll = await this.payrollRepo.findOne({
      where: { id: payrollId },
    });
    if (!payroll)
      throw new NotFoundException('Payroll with that id dose not exist');
    return payroll;
  }

  async remove(payrollId: number) {
    const payroll = await this.payrollRepo.findOne({
      where: { id: payrollId },
    });
    if (!payroll)
      throw new NotFoundException('Payroll with that id dose not exist');

    return await this.payrollRepo.remove(payroll);
  }
}
