import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

import { UserDecorator } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.userService.login(body);
    if (await this.authService.isPasswordEqual(user, body.password))
      return (session.user = this.userService.returnSafeFields(user));
    throw new ConflictException('Password is wrong');
  }

  @Post('register')
  async register(@Body() body: RegisterUserDto, @Session() session: any) {
    session.user = await this.userService.create(body);
  }

  @Delete('logout')
  async logout(@Session() session: any) {
    delete session.user;
  }

  @Get('/')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('auth')
  @UseGuards(AuthGuard)
  getUserAuth(@UserDecorator() user: User) {
    return user;
  }
  @Patch()
  @UseGuards(AuthGuard)
  async update(
    @Body() body: UpdateUserDto,
    @UserDecorator() user: User,
    @Session() session: any,
  ) {
    const newUserInfo = await this.userService.update(body, user.id);
    session.user = newUserInfo;
    return newUserInfo;
  }
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
