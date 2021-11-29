import { Body, Controller, Get, Post } from '@nestjs/common';
import { Visit } from '../schemas/vists.schema';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from '../dtos/create-visit.dto';

@Controller('visits')
export class VisitsController {

  constructor(private visitsService: VisitsService) {
  }

  @Get()
  async findAll(): Promise<Visit[]> {
    return this.visitsService.findAll();
  }

  @Post('create')
  async createVisit(@Body() createVisitDto: CreateVisitDto) {
    return await this.visitsService.create(createVisitDto);
  }

}
