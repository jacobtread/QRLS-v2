import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Visit, VisitDocument } from '../schemas/vists.schema';
import { Model } from 'mongoose';
import { CreateVisitDto } from '../dtos/create-visit.dto';

@Injectable()
export class VisitsService {

  constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>) {
  }

  async create(createVisitDto: CreateVisitDto) {
    const date = new Date()
    const createdVisit = new this.visitModel({...createVisitDto, date})
    return createdVisit.save()
  }

  async findAll(): Promise<Visit[]> {
    return this.visitModel.find().exec()
  }

}
