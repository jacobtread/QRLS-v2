import { Matches } from 'class-validator';

export class VerifyPassDto {
  @Matches(/(NZCP:\/)(\d+)\/([A-Za-z2-7=]+)/)
  data: string;
}