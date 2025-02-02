import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DirectChat, DirectChatDocument } from '../schemas/direct-chat.schema';

@Injectable()
export class DirectChatRepository {
  constructor(
    @InjectModel(DirectChat.name) private chatModel: Model<DirectChatDocument>,
  ) {}

  async createChat(chat: Partial<DirectChat>): Promise<DirectChat> {
    const newChat = new this.chatModel(chat);
    return newChat.save();
  }

  async findChatById(chatID: string): Promise<DirectChat | null> {
    return this.chatModel.findOne({ chatID }).exec();
  }

  async findUserChats(userID: Types.ObjectId): Promise<DirectChat[]> {
    return this.chatModel
      .find({
        $or: [{ sendID: userID }, { receiverID: userID }],
        isDeleted: false,
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateChat(
    chatID: string,
    updateData: Partial<DirectChat>,
  ): Promise<DirectChat | null> {
    return this.chatModel
      .findOneAndUpdate({ chatID }, updateData, { new: true })
      .exec();
  }

  async softDeleteChat(chatID: string): Promise<void> {
    await this.chatModel.updateOne({ chatID }, { isDeleted: true }).exec();
  }

  async markMessageAsRead(
    chatID: string,
    userID: Types.ObjectId,
  ): Promise<void> {
    await this.chatModel
      .updateOne(
        { chatID },
        { $addToSet: { readBy: userID }, seenAt: new Date() },
      )
      .exec();
  }
}
