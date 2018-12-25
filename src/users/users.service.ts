import { Injectable } from '@nestjs/common';
// import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


async create(user): Promise<User[]> {
  return await this.userRepository.save(user)
}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
