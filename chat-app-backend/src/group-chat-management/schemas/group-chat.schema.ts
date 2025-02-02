import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class GroupChat {
  @Prop({ required: true })
  groupID: string;
}
