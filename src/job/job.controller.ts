import { Body, Controller, Get, Param, Query, Post, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobService } from './job.service';
import { JobEntity } from './entity/job.entity';
import { JobModel } from './model/job.model';
import { Pagination } from './../paginate';
import { ValidationPipe } from '../validations/post-validation.pipe';
import { UpdateResult } from 'typeorm';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Get()
    async findAll(@Query() query): Promise<Pagination<JobEntity>> {
        let options = {
            limit: query.hasOwnProperty('limit') ? query.limit : 10,
            skip: query.hasOwnProperty('skip') ? query.skip : 0,
        }

        if (query.hasOwnProperty('keywords') && query.keywords) {
            Object.assign(options, { keywords: query.keywords })
        }

        if (query.hasOwnProperty('status') && query.status) {
            Object.assign(options, { status: query.status })
        }
        return this.jobService.findAll(options);
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        const job = await this.jobService.findById(id);

        if (!job) {
            throw new NotFoundException();
        } else {
            return job
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body(new ValidationPipe()) body: JobModel) {
        return this.jobService.create(body);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id') id: number,
        @Body(new ValidationPipe()) body: JobModel,
    ): Promise<UpdateResult> {

        const job = await this.jobService.findById(id);

        if (!job) {
            throw new NotFoundException();
        }

        return await this.jobService.update({
            id: id,
            ...body,
        });
    }
}
