import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // Adds `createdAt` and `updatedAt` automatically
export class User {
  @Prop({ required: true, unique: true, index: true, type: String })
  userID: string; // Unique identifier for the user

  @Prop({
    required: true,
    unique: true,
    type: Number,
    validate: {
      validator: (v: number) => /^[0-9]{10,15}$/.test(v.toString()),
      message: 'Phone number must be between 10 and 15 digits.',
    },
  })
  phone: number; // Validated phone number (10-15 digits)

  @Prop({
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: (v: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
      message: 'Invalid email address.',
    },
  })
  email: string; // Validated email address

  @Prop({ required: true, type: String, select: false })
  password: string; // Hashed password, excluded from queries

  @Prop({ type: String, default: null })
  avatarUrl?: string; // Optional avatar URL

  @Prop({ type: String, maxlength: 200, default: '' })
  bio?: string; // Optional bio with a max length of 200 characters

  @Prop({ type: Date, default: () => new Date() })
  lastSeen?: Date; // Last seen timestamp

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean; // Soft delete flag to prevent hard deletion

  @Prop({
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  })
  role?: string; // Role to differentiate user types

  @Prop({
    type: String,
    enum: ['online', 'offline', 'banned'],
    default: 'offline',
  })
  status?: string; // User status to manage online/offline state

  @Prop({ type: Number, default: 0 })
  loginAttempts?: number; // Tracks login attempts for rate limiting

  @Prop({ type: Date, default: null })
  lockUntil?: Date; // Lockout period for rate limiting

  @Prop({ type: Date, default: null })
  lastLoginAt?: Date; // Tracks the last login timestamp

  @Prop({ type: Boolean, default: false })
  twoFactorEnabled?: boolean; // Flag for two-factor authentication
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook for password hashing
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password not modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Indexing fields for efficient querying
UserSchema.index({ email: 1, phone: 1 });
