import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './entities/payroll.entity';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { User } from 'src/user/entities/user.entity';

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

  findAll() {
    return `This action returns all payroll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payroll`;
  }

  // update(id: number, updatePayrollDto: UpdatePayrollDto) {
  //   return `This action updates a #${id} payroll`;
  // }

  remove(id: number) {
    return `This action removes a #${id} payroll`;
  }
}
