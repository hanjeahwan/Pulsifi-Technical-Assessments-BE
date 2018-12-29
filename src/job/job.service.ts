import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal, UpdateResult } from 'typeorm';
import { JobEntity } from './entity/job.entity';
import { JobModel } from './model/job.model';
import { CondationsInterface } from './interfaces/condition.interface';
import { Pagination, PaginationOptionsInterface } from './../paginate';
import axios, { AxiosInstance } from 'axios';
import { defer, Observable } from 'rxjs';

@Injectable()
export class JobService {
    private client: AxiosInstance;

    constructor(
        @InjectRepository(JobEntity)
        private readonly jobRepository: Repository<JobEntity>,
    ) {
        this.client = axios.create({
            baseURL: 'https://onesignal.com/api/v1/',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Basic NzIzN2I4Y2MtZWI1NS00NGNjLWExODUtNjQyNzMyMzUwYzlj"
            }
        });
    }

    async create(job: JobModel): Promise<JobEntity> {
        const data = await this.jobRepository.save(
            this.jobRepository.create(job)
        );
        const push = await this.pushNotification(data);
        return data
    }

    async update(job: JobModel): Promise<UpdateResult> {
        return await this.jobRepository.update(job.id, job);
    }

    async findAll(options: PaginationOptionsInterface): Promise<Pagination<JobEntity>> {
        const query = this.jobRepository.createQueryBuilder("job");

        if (options.keywords) {
            query.where("LOWER(job.title) LIKE LOWER(:title)", { title: `%${options.keywords}%` });
        }
        if (options.status) {
            query.andWhere("job.status = :status", { status: options.status });
        }

        const [results, total] = await query.take(options.limit).skip(options.skip).getManyAndCount();
        return new Pagination<JobEntity>({
            results,
            total,
        });
    }

    async findById(id: number): Promise<JobEntity | null> {
        return await this.jobRepository.findOne(id);
    }


    async pushNotification(job: JobModel): Promise<any> {
        const response = await this.client({
            url: 'notifications',
            method: 'post',
            data: {
                app_id: "cd715dec-a2c8-4850-9ad3-831e8485a066",
                headings: { "en": job.title },
                contents: { "en": job.breif },
                included_segments: ["All"],
            }
        });
        return response.data;
    }
}
