import { Injectable } from '@nestjs/common';
import { config } from 'src/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      config.TWILIO_ACCOUNT_SID,
      config.TWILIO_AUTH_TOKEN,
    );
  }

  async sendSMS(to: string, message: string): Promise<void> {
    await this.client.messages.create({
      body: message,
      from: config.TWILIO_PHONE_NUMBER,
      to,
    });
  }
}
