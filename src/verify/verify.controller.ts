import { Body, Controller, Post } from '@nestjs/common';
import { VerifyPassDto } from '../dtos/verify-pass.dto';
import { VerifyService } from './verify.service';
import { VerifyU12Dto } from '../dtos/verify-u12.dto';

@Controller('verify')
export class VerifyController {

  constructor(private verifyService: VerifyService) {
  }

  @Post()
  async verify(@Body() data: VerifyPassDto) {
    return await this.verifyService.verify(data);
  }

  @Post('confirm')
  async verifyConfirm(@Body() data: VerifyPassDto) {
    return await this.verifyService.verifyConfirm(data);
  }

  @Post('u12')
  async verifyU12(@Body() data: VerifyU12Dto) {
    return await this.verifyService.verifyU12(data);
  }

}
