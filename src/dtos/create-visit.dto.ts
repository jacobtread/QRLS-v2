import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateVisitDto {

  @IsMongoId() member: ObjectId;

}
