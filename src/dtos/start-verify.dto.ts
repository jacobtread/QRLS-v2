import { Matches } from 'class-validator';

export class StartVerifyDto {
  @Matches(/(NZCP:)[/1-9a-zA-Z]+/)
  data: string;
}