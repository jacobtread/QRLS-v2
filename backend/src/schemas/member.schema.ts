import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { VerifiedCredentials, VerifiedCredentialsSchema } from './verified-credentials.schema';

export type MemberDocument = Member & Document

@Schema()
export class Member {

  @Prop() name: string;
  @Prop({ type: VerifiedCredentialsSchema, required: false }) credentials: VerifiedCredentials;
  @Prop({ required: true, default: false }) verifiedState: boolean;

  @Prop({ type: Date, required: false }) dob: Date;
  @Prop({ type: Date, required: false }) expiresAt: Date;

}

export const MemberSchema = SchemaFactory.createForClass(Member);
