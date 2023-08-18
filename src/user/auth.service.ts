import { Injectable } from '@nestjs/common';
import { compare as comparePassword } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  async isPasswordEqual(user: User, enteredPassword: string) {
    return await comparePassword(enteredPassword, user.password);
  }
}
