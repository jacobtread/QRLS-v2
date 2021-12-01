import { Body, Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { SetSettingDto } from './dtos/set-setting.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  settings = {
    mandate: true,
    nvMessage: `
      Vaccination is required to enter please wait at the entrance and let somebody know that you are there
    `,
  };

  @Get('settings')
  getSettings() {
    console.log(this.settings)
    return this.settings;
  }

  @Put('settings')
  setSetting(@Body() setSettingDto: SetSettingDto) {
    console.log(setSettingDto)
    this.settings[setSettingDto.key] = setSettingDto.value;
  }

}
