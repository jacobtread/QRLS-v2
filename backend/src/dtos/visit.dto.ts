import { IsMongoId } from 'class-validator';

export class VisitDto {
  @IsMongoId()
  member?: string;
  guestName?: string;
}
