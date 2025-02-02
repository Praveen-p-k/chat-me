import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import { User } from './schemas/user-management.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(userData: Partial<User>): Promise<User> {
    return this.usersRepository.create(userData);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.usersRepository.updateById(
      userId,
      updateData,
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.usersRepository.deleteById(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
