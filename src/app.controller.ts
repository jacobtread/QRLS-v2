import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  settings = {
    mandate: true,
    nvMessage: `
    
    `
  }

  @Get('settings')
  getSettings() {

  }

}
