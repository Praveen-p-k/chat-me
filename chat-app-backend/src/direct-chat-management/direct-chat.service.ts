import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { DirectChat } from './schemas/direct-chat.schema';
import { DirectChatRepository } from './repositories/direct-chat.repository';

@Injectable()
export class DirectChatService {
  constructor(private readonly chatRepository: DirectChatRepository) {}

  async createChat(
    sendID: Types.ObjectId,
    receiverID: Types.ObjectId,
    message: string,
    messageType: string,
    attachmentUrl?: string,
  ): Promise<DirectChat> {
    return this.chatRepository.createChat({
      sendID,
      receiverID,
      message,
      messageType,
      attachmentUrl,
    });
  }

  async getChatById(chatID: string): Promise<DirectChat> {
    const chat = await this.chatRepository.findChatById(chatID);
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatID} not found`);
    }
    return chat;
  }

  async getUserChats(userID: Types.ObjectId): Promise<DirectChat[]> {
    return this.chatRepository.findUserChats(userID);
  }

  async updateChat(
    chatID: string,
    updateData: Partial<DirectChat>,
  ): Promise<DirectChat> {
    return this.chatRepository.updateChat(chatID, updateData);
  }

  async deleteChat(chatID: string): Promise<void> {
    await this.chatRepository.softDeleteChat(chatID);
  }

  async markChatAsRead(chatID: string, userID: Types.ObjectId): Promise<void> {
    await this.chatRepository.markMessageAsRead(chatID, userID);
  }
}
