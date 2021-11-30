import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Member } from './member.schema';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document

@Schema()
export class Visit {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedMember', required: false }) member: Member;
  @Prop({required: false}) guestName: string
  @Prop({ type: Date, required: true }) date: Date;

}

export const VisitSchema = SchemaFactory.createForClass(Visit);
