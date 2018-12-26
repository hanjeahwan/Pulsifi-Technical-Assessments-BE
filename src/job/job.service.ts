import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal, UpdateResult } from 'typeorm';
import { JobEntity } from './entity/job.entity';
import { JobModel } from './model/job.model';
import { CondationsInterface } from './interfaces/condition.interface';
import { Pagination, PaginationOptionsInterface } from './../paginate';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobEntity)
        private readonly jobRepository: Repository<JobEntity>,
    ) { }

    async create(job: JobModel): Promise<JobEntity> {
        return await this.jobRepository.save(
            this.jobRepository.create(job)
        );
    }

    async update(job: JobModel): Promise<UpdateResult> {
      return await this.jobRepository.update(job.id, job);
    }

    async findAll(options: PaginationOptionsInterface): Promise<Pagination<JobEntity>> {
        const condations = () => {
            let where: CondationsInterface = {}
            if (options.keywords) {
                where.title = Like(`%${options.keywords}%`)
            }
            if (options.status) {
                where.status = Equal(options.status)
            }
            return where
        }

        const [results, total] = await this.jobRepository.findAndCount({
            where: condations(),
            order: { id: "DESC" },
            take: options.limit,
            skip: options.skip,
        })

        return new Pagination<JobEntity>({
            results,
            total,
        });
    }

    async findById(id: number): Promise<JobEntity | null> {
      return await this.jobRepository.findOne(id);
    }
}
