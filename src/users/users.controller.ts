import { Controller, Delete, Put } from '@nestjs/common';
import { Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './dto/user.dto';

@Controller('/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/add')
  async create(@Body() user: User) {
    return await this.usersService.createUser(user);
  }

  @Get('/all')
  async findAll() {
    return await this.usersService.getAllUsers();
  }

  @Get('/find/')
  async findOne(@Body('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put('/update/:id')
  async update(@Body() data: User, @Param('id') id: string) {
    return await this.usersService.updateUser(id, data);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
