import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { User } from './entity/user.entity';
import { CondationsInterface } from './interfaces/condition.interface';
import { Pagination, PaginationOptionsInterface } from './../paginate';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(user): Promise<User[]> {
        return await this.userRepository.save(user)
    }

    async findAll(options: PaginationOptionsInterface): Promise<Pagination<User>> {
        const condations = () => {
            let where: CondationsInterface = {}
            if (options.keywords) {
                where.name = Like(`%${options.keywords}%`)
            }
            if (options.status) {
                where.status = Equal(options.status)
            }
            return where
        }

        const [results, total] = await this.userRepository.findAndCount({
            where: condations(),
            order: { id: "DESC" },
            take: options.limit,
            skip: options.skip,
        })
      
        return new Pagination<User>({
            results,
            total,
        });
    }

    async findOne(id): Promise<User> {
        return await this.userRepository.findOne(id)
    }
}
