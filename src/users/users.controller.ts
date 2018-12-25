import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './interfaces/user.interface';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        // console.error(createUserDto)
      return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Get(':id')
    findOne(
      @Param('id')
      id,
    ) {
      // logic
    }

}
