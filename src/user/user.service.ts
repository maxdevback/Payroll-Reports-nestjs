import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash as hashPassword, compare as comparePassword } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async _findOneByWhere(where: FindOptionsWhere<User>) {
    return await this.userRepo.findOne({ where });
  }
  returnSafeFields(user: User) {
    return { username: user.username, id: user.id, role: user.role };
  }
  async create(data: RegisterUserDto) {
    const userWithThatUsername = await this._findOneByWhere({
      username: data.username,
    });
    if (userWithThatUsername)
      throw new ConflictException('Username already taken');
    const userWithThatEmail = await this._findOneByWhere({ email: data.email });
    if (userWithThatEmail) throw new ConflictException('Email already taken');
    const user = this.userRepo.create(data);
    if ((await this.findAll()).length === 0) user.role = 'admin';
    return this.returnSafeFields(await this.userRepo.save(user));
  }
  async login(data: LoginUserDto) {
    const user = await this._findOneByWhere({ username: data.username });
    if (!user) throw new NotFoundException('User with that username not found');
    return user;
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User with id dose not found');

    return await this.userRepo.remove(user);
  }
  async update(data: UpdateUserDto, authId: number) {
    const user = await this.findOne(+authId);
    if (!user) throw new NotFoundException('User with that id dose not found');
    if (!(await comparePassword(data.password, user.password)))
      throw new ConflictException('Password is wrong');
    if (data.newPassword) {
      user.password = await hashPassword(data.newPassword, 10);
    }
    (user.username = data.username ? data.username : user.username),
      (user.email = data.email ? data.email : user.email);
    return this.returnSafeFields(await this.userRepo.save(user));
  }
}
