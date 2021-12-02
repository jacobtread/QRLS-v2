import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Visit } from '../schemas/vists.schema';
import { VisitsService } from './visits.service';
import { VisitDto } from '../dtos/visit.dto';
import { DateTime } from 'luxon';
import { DeleteVisitDto } from '../dtos/delete-visit.dto';

@Controller('visits')
export class VisitsController {

  constructor(private visitsService: VisitsService) {
  }

  @Get()
  async findAll(@Query('date') date: string): Promise<Visit[]> {
    return this.visitsService.allForDate(DateTime.fromISO(date));
  }

  @Post()
  async createVisit(@Body() createVisitDto: VisitDto) {
    return await this.visitsService.create(createVisitDto);
  }

  @Delete()
  async deleteVisit(@Body() deleteVisitDto: DeleteVisitDto) {
    await this.visitsService.deleteVisit(deleteVisitDto);
    return {};
  }


}
