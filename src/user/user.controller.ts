import { Body, Controller, Get, Param, Query, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../validations/post-validation.pipe';
import { UserEntity } from './entity/user.entity';
import { Pagination } from './../paginate';
import { UserModel } from './model/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  async create(@Body(new ValidationPipe()) user: UserModel) {
    return this.userService.create(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query): Promise<Pagination<UserEntity>> {
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

    return this.userService.findAll(options);
  }

  // @Get(':id')
  // async findOne(@Param('id') id) {
  //   console.error('asd')
  //   return this.userService.findOne(id);
  // }

}
