import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body('phone') phone: string): Promise<{ message: string }> {
    if (!phone) throw new BadRequestException('Phone number is required');
    await this.authService.sendOTP(phone);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('phone') phone: string,
    @Body('otp') otp: string,
  ): Promise<{ message: string }> {
    const isValid = this.authService.verifyOTP(phone, otp);
    return { message: isValid ? 'OTP verified successfully' : 'Invalid OTP' };
  }
}
