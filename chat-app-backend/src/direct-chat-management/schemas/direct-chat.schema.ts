import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DirectChatDocument = HydratedDocument<DirectChat>;

@Schema({ timestamps: true }) // Adds `createdAt` and `updatedAt` automatically
export class DirectChat {
  @Prop({
    required: true,
    unique: true,
    type: String,
    index: true,
  })
  chatID: string; // Unique identifier (can be a composite key)

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  sendID: Types.ObjectId; // Sender's ID

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  receiverID: Types.ObjectId; // Receiver's ID

  @Prop({ required: true, type: String })
  message: string; // Message content

  @Prop({
    required: true,
    enum: ['text', 'image', 'video', 'audio', 'file'],
    default: 'text',
  })
  messageType: string; // Type of message

  @Prop({ type: String, default: null })
  attachmentUrl?: string; // URL for non-text attachments

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  readBy?: Types.ObjectId[]; // Users who have read the message

  @Prop({ type: Date, default: null })
  deliveredAt?: Date; // Timestamp when the message was delivered

  @Prop({ type: Date, default: null })
  seenAt?: Date; // Timestamp when the message was seen

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean; // Soft deletion flag
}

export const DirectChatSchema = SchemaFactory.createForClass(DirectChat);

// Pre-save hook to generate a deterministic chatID (sorted combination of sendID and receiverID)
DirectChatSchema.pre<DirectChatDocument>('save', function (next) {
  if (!this.chatID) {
    const sortedIDs = [
      this.sendID.toString(),
      this.receiverID.toString(),
    ].sort();
    this.chatID = `${sortedIDs[0]}_${sortedIDs[1]}`; // Composite key format
  }
  next();
});

// Indexes for optimized querying
DirectChatSchema.index({ sendID: 1, receiverID: 1, createdAt: -1 });
DirectChatSchema.index({ chatID: 1, messageType: 1 });
