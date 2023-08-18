import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserDecorator } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createPayrollDto: CreatePayrollDto,
    @UserDecorator() user: User,
  ) {
    return this.payrollService.create(createPayrollDto, user);
  }

  @Get()
  findAll() {
    return this.payrollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
  //   return this.payrollService.update(+id, updatePayrollDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(+id);
  }

  @Patch('approve/:id')
  @UseGuards(AuthGuard, AdminGuard)
  approve() {}
}
