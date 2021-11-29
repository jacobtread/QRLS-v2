import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { VerifiedCredentials, VerifiedCredentialsSchema } from './verified-credentials.schema';

export type MemberDocument = VerifiedMember & Document

@Schema()
export class VerifiedMember {

  @Prop() name: string;
  @Prop({ type: VerifiedCredentialsSchema, required: false }) credentials: VerifiedCredentials;

}

export const MemberSchema = SchemaFactory.createForClass(VerifiedMember);
