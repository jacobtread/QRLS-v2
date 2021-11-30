import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Visit, VisitDocument } from '../schemas/vists.schema';
import { Model } from 'mongoose';
import { VisitDto } from '../dtos/visit.dto';
import { DateTime } from 'luxon';

@Injectable()
export class VisitsService {

  constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>) {
  }

  async create(visitDto: VisitDto) {
    const date = DateTime.now().toISODate();
    if (await this.visitModel.findOne({ ...visitDto, date })) {
      throw new HttpException(
        'You are already marked as attending today',
        422,
      );
    }
    const createdVisit = new this.visitModel({ ...visitDto, date });
    return createdVisit.save();
  }

  async remove(visitDto: VisitDto) {
    const date = DateTime.now().toISODate();
    return await this.visitModel.deleteOne({ ...visitDto, date });
  }

  async findAll(): Promise<Visit[]> {
    return this.visitModel.find().exec();
  }

}
