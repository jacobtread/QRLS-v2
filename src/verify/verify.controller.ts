import { Body, Controller, Post } from '@nestjs/common';
import { StartVerifyDto } from '../dtos/start-verify.dto';
import { VerifyService } from './verify.service';

@Controller('verify')
export class VerifyController {

  constructor(private verifyService: VerifyService) {
  }

  @Post('start')
  async startVerify(@Body() data: StartVerifyDto) {
    return await this.verifyService.startVerify(data)
  }

}
