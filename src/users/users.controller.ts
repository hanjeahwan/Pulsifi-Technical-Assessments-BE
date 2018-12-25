import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from './validation/validation.pipe';
import { User } from './entity/user.entity';
import { Pagination } from './../paginate';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query): Promise<Pagination<User>> {
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

    return this.usersService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    console.error('asd')
    return this.usersService.findOne(id);
  }

}
