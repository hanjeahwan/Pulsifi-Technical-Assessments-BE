import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from './validation/validation.pipe';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    console.error('asd')
    return this.usersService.findOne(id);
  }

}
