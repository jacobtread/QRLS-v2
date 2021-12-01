import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Visit, VisitDocument } from '../schemas/vists.schema';
import { Model } from 'mongoose';
import { VisitDto } from '../dtos/visit.dto';
import { DateTime } from 'luxon';
import { Member, MemberDocument } from '../schemas/member.schema';

@Injectable()
export class VisitsService {

  constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>, @InjectModel(Member.name) private memberModel: Model<MemberDocument>) {
  }

  async getForToday(visitDto: VisitDto) {

  }

  async create(visitDto: VisitDto) {
    const now = DateTime.now();
    const date = now.toISODate();
    if (await this.visitModel.findOne({ ...visitDto, date })) {
      throw new HttpException(
        'You are already marked as attending today',
        422,
      );
    }
    if (visitDto.member) {
      const member = await this.memberModel.findOne({ _id: visitDto.member });
      if (member) {
        const expiresAt: DateTime = DateTime.fromJSDate(member.expiresAt).minus({ week: 2 });
        // console.log(expiresAt.toJSDate())
        const remaining = expiresAt.until(DateTime.now()).length('milliseconds');
        if (!(isNaN(remaining) || remaining === 0)) {
          this.visitModel.updateMany({ member: member._id }, { member: null });
          member.remove();
          // TODO: EXPIRED
          throw new HttpException(
            'You vaccine pass has expired please redo the verification proccess',
            403,
          );
        }
      }
    }

    const createdVisit = new this.visitModel({ ...visitDto, date, time: now.toISOTime() });
    return createdVisit.save();
  }

  async remove(visitDto: VisitDto) {
    const date = DateTime.now().toISODate();
    return this.visitModel.deleteOne({ ...visitDto, date });
  }

  async findAll(): Promise<Visit[]> {
    return this.visitModel.find().exec();
  }

  async allForDate(date: DateTime) {
    return this.visitModel.find({ date: date.toISODate() }).exec();
  }

}
