import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TwilioService } from '../twilio/twilio.service';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, string>(); // Store OTPs temporarily

  constructor(private readonly twilioService: TwilioService) {}

  generateOTP(length = 6): string {
    return Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(0, length);
  }

  async sendOTP(phone: string): Promise<void> {
    const otp = this.generateOTP();
    this.otpStore.set(phone, otp); // Store OTP in memory (consider a Redis store for production)

    const message = `Your verification code is ${otp}.`;
    await this.twilioService.sendSMS(phone, message);
  }

  verifyOTP(phone: string, otp: string): boolean {
    const storedOtp = this.otpStore.get(phone);
    if (storedOtp === otp) {
      this.otpStore.delete(phone); // Remove OTP after verification
      return true;
    }
    throw new UnauthorizedException('Invalid OTP');
  }
}
