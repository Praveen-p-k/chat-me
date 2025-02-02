import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user-management.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userID: userId }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateById(
    userId: string,
    update: Partial<User>,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ userID: userId }, update, { new: true })
      .exec();
  }

  async deleteById(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ userID: userId }, { isDeleted: true })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({ isDeleted: false }).exec();
  }
}
