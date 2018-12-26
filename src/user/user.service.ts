import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserModel } from './model/user.model';
import { CondationsInterface } from './interfaces/condition.interface';
import { Pagination, PaginationOptionsInterface } from './../paginate';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    private saltRounds: number = 10;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async create(user: UserModel): Promise<UserEntity> {
        user.password = await this.getHash(user.password);
        const result = await this.userRepository.save(
            this.userRepository.create(user),
        );
        delete result.password;
        return result;
    }

    async findAll(options: PaginationOptionsInterface): Promise<Pagination<UserEntity>> {
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

        return new Pagination<UserEntity>({
            results,
            total,
        });
    }

    async findById(id: number): Promise<UserEntity | null> {
        return await this.userRepository.findOneOrFail(id);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: {
                email,
            },
        });
    }

    async findByEmailWithPassword(email: string): Promise<UserEntity> | null {
        return await this.userRepository.findOne({ email }, { select: ['email', 'password'] },
        );
    }

    async getHash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
