import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Member } from './member.schema';

export type VisitDocument = Visit & Document

@Schema()
export class Visit {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedMember', required: false }) member: string;
  @Prop({ required: false }) guestName: string;
  @Prop({ required: true }) date: string;

}

export const VisitSchema = SchemaFactory.createForClass(Visit);
