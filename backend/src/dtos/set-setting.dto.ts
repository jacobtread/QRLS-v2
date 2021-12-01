import { IsNotEmpty } from 'class-validator';

export class SetSettingDto {
  @IsNotEmpty()
  key: string;
  @IsNotEmpty()
  value: string;
}