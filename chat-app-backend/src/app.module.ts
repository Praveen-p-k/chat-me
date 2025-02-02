import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleDriveModule } from './google-drive/google-drive.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { DirectChatModule } from './direct-chat-management/direct-chat.module';
import { GroupChatModule } from './group-chat-management/group-chat.module';
import { UserManagementModule } from './user-management/user-management.module';
import { TwilioModule } from './twilio/twilio.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URL),
    GoogleDriveModule,
    DirectChatModule,
    GroupChatModule,
    UserManagementModule,
    TwilioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
