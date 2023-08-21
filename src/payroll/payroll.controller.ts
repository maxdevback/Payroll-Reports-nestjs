import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserDecorator } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { QueryGetPayrollDto } from './dto/query-get-payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createPayrollDto: CreatePayrollDto,
    @UserDecorator() user: User,
  ) {
    return await this.payrollService.create(createPayrollDto, user);
  }

  @Get()
  async findAll(@Query() query: QueryGetPayrollDto) {
    return await this.payrollService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.payrollService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    return await this.payrollService.remove(+id);
  }

  @Patch('approve/:payrollId')
  @UseGuards(AuthGuard, AdminGuard)
  async approve(@Param('payrollId') payrollId: number) {
    return await this.payrollService.approve(+payrollId);
  }
}
