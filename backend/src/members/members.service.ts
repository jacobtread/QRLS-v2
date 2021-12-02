import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from '../schemas/member.schema';
import { AddMemberDto } from '../dtos/add-member.dto';
import { DateTime } from 'luxon';

@Injectable()
export class MembersService {

  constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {
  }

  async addMember(addMemberDto: AddMemberDto) {
    const name = addMemberDto.name;
    const dob = DateTime.fromISO(addMemberDto.dob);
    const expiryDate = DateTime.now().plus({ month: 6 });
    const newMember = new this.memberModel({
      name,
      verifiedState: true,
      dob: dob.toJSDate(),
      expiresAt: expiryDate.toJSDate(),
    });
    await newMember.save();
    return {};
  }

}
