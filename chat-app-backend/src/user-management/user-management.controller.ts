import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { User } from './schemas/user-management.schema';
import { UsersService } from './user-management.service';
import { v4 as uuid } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    const userID = uuid();
    userData.userID = userID;

    console.log('signup: ', userID, userData);
    try {
      return await this.usersService.createUser(userData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    await this.usersService.deleteUser(userId);
  }
}
