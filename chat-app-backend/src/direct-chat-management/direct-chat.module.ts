import { Module } from '@nestjs/common';
import { DirectChatService } from './direct-chat.service';
import { DirectChatController } from './direct-chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectChat, DirectChatSchema } from './schemas/direct-chat.schema';
import { DirectChatRepository } from './repositories/direct-chat.repository';
import { DirectChatGateway } from './direct-chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DirectChat.name, schema: DirectChatSchema },
    ]),
  ],
  controllers: [DirectChatController],
  providers: [DirectChatService, DirectChatGateway, DirectChatRepository],
})
export class DirectChatModule {}
