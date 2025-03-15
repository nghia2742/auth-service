
import { Injectable } from '@nestjs/common';
import { USERS } from 'src/shared/user.constant';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = USERS;

  // eslint-disable-next-line @typescript-eslint/require-await
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
