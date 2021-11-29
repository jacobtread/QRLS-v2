import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VerifiedMember } from './member.schema';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document

@Schema()
export class Visit {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedMember' }) member: VerifiedMember;
  @Prop({ type: Date, required: true }) date: Date;

}

export const VisitSchema = SchemaFactory.createForClass(Visit);
