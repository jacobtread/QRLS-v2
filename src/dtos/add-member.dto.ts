import { IsDate } from 'class-validator';

export class AddMemberDto {

  name: string;
  @IsDate()
  dob: Date;

}