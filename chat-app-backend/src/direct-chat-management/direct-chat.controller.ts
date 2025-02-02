import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DirectChatService } from './direct-chat.service';
import { Types } from 'mongoose';
import { DirectChat } from './schemas/direct-chat.schema';

@Controller('chat/dm')
export class DirectChatController {
  constructor(private readonly chatService: DirectChatService) {}

  @Post()
  async createChat(
    @Body('sendID') sendID: string,
    @Body('receiverID') receiverID: string,
    @Body('message') message: string,
    @Body('messageType') messageType: string,
    @Body('attachmentUrl') attachmentUrl?: string,
  ) {
    return this.chatService.createChat(
      new Types.ObjectId(sendID),
      new Types.ObjectId(receiverID),
      message,
      messageType,
      attachmentUrl,
    );
  }

  @Get(':chatID')
  async getChatById(@Param('chatID') chatID: string) {
    return this.chatService.getChatById(chatID);
  }

  @Get('/user/:userID')
  async getUserChats(@Param('userID') userID: string) {
    return this.chatService.getUserChats(new Types.ObjectId(userID));
  }

  @Put(':chatID')
  async updateChat(
    @Param('chatID') chatID: string,
    @Body() updateData: Partial<DirectChat>,
  ) {
    return this.chatService.updateChat(chatID, updateData);
  }

  @Delete(':chatID')
  async deleteChat(@Param('chatID') chatID: string) {
    await this.chatService.deleteChat(chatID);
  }

  @Put(':chatID/read')
  async markChatAsRead(
    @Param('chatID') chatID: string,
    @Body('userID') userID: string,
  ) {
    await this.chatService.markChatAsRead(chatID, new Types.ObjectId(userID));
  }
}
