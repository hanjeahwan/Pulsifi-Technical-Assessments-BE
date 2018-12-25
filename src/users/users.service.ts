import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { User } from './entity/user.entity';
interface Paginate {
    data: any;
    count: number
}
interface Anything {
    [key: string]: any;
}
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(user): Promise<User[]> {
        return await this.userRepository.save(user)
    }

    async findAll(query): Promise<Paginate> {
        const take = query.take || 10
        const skip = query.skip || 0
        const keyword = query.keyword || ''
        const builder = this.userRepository.createQueryBuilder("user")
        const status = query.status || 1

        // const condations = () => {
        //     let where:Anything = {}
        //     if (query.keyword) {
        //         where.name = Like(`%${query.keyword}%`)
        //     } else if (query.status) {
        //         where.status = Equal(query.status)
        //     }
        //     return where
        // }

        const [result, total] = await this.userRepository.findAndCount(
            {
                where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
                take: take,
                skip: skip
            }
        );
        // console.error(condations())
        // const total = await builder.where("user.name like :name", { name: '%' + keyword + '%' }).getCount()

        // const total =  await this.userRepository
        //     .find({
        //         where: condations(),
        //     }).getCount()
        // const data = await this.userRepository
        //     .find({
        //         where: condations(),
        //         order: {
        //             id: "DESC"
        //         },
        //         skip,
        //         take
        //     })
        // .orderBy('name', 'DESC')
        // .skip(skip)
        // .take(take)
        // .where("user.name like :name", { name: `%${keyword}%` })
        // .orderBy('name', 'DESC')
        // .skip(skip)
        // .take(take)
        // .getMany();

        return {
            data: result,
            count: total
        }
    }

    async findOne(id): Promise<User> {
        return await this.userRepository.findOne(id)
    }
}
