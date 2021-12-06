import { Body, Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { SetSettingDto } from './dtos/set-setting.dto';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  settings = {
    mandate: true,
    nvMessage: 'Vaccination is required to enter based on today\'s requirements. Please wait at the entrance and let somebody know that you are there.',
    admin: process.env.ADMIN_PASSWORD
  };

  @Get('settings')
  async getSettings() {
    await this.loadSettings();
    return this.settings;
  }

  @Put('settings')
  async setSetting(@Body() setSettingDto: SetSettingDto) {
    const key = setSettingDto.key;
    this.settings[key] = setSettingDto.value;
    await this.saveSettings();
    return {};
  }

  async saveSettings() {
    const dataDir = join(__dirname, 'data')
    if (!existsSync(dataDir)) {
      await fs.mkdir(dataDir)
    }
    return await fs.writeFile(join(__dirname, 'data', 'settings.json'), JSON.stringify(this.settings));
  }

  async loadSettings() {
    const dataDir = join(__dirname, 'data')
    const file = join(dataDir, 'settings.json');
    if (existsSync(file)) {
      this.settings = JSON.parse(await fs.readFile(file, 'utf-8'));
      this.settings.admin = process.env.ADMIN_PASSWORD
    }
  }

}
