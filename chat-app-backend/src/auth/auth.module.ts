import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TwilioService } from 'src/twilio/twilio.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TwilioService],
})
export class AuthModule {}
