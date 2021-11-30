import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Visit } from '../schemas/vists.schema';
import { VisitsService } from './visits.service';
import { VisitDto } from '../dtos/visit.dto';

@Controller('visits')
export class VisitsController {

  constructor(private visitsService: VisitsService) {
  }

  @Get()
  async findAll(): Promise<Visit[]> {
    return this.visitsService.findAll();
  }

  @Post()
  async createVisit(@Body() createVisitDto: VisitDto) {
    return await this.visitsService.create(createVisitDto);
  }

  @Delete()
  async deleteVisit(@Body() visitDto: VisitDto) {
    await this.visitsService.remove(visitDto)
    return {}
  }

}
