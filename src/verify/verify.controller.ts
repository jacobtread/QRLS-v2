import { Body, Controller, Post } from '@nestjs/common';
import { VerifyDto } from '../dtos/verify.dto';
import { VerifyService } from './verify.service';

@Controller('verify')
export class VerifyController {

  constructor(private verifyService: VerifyService) {
  }

  @Post()
  async verify(@Body() data: VerifyDto) {
    return await this.verifyService.verify(data);
  }

  @Post('confirm')
  async verifyConfirm(@Body() data: VerifyDto) {
    return await this.verifyService.verifyConfirm(data);
  }

}
