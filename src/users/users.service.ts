import { Injectable } from '@nestjs/common';
import { AccountType, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(conditions: Partial<User>): Promise<User | null> {
    return await this.usersRepository.findOneBy(conditions);
  }

  async createUser(userInfo: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(userInfo);
  }

  async findOrCreate(userInfo: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne({ email: userInfo.email });
    if (existingUser) {
      return existingUser;
    }

    const newUser = {
      ...userInfo,
      accountType: AccountType.GOOGLE
    }
    return this.createUser(newUser);
  }
}
