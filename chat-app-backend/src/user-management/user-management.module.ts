import { Module } from '@nestjs/common';
import { UsersService } from './user-management.service';
import { UsersController } from './user-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user-management.schema';
import { UsersRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UserManagementModule {}
