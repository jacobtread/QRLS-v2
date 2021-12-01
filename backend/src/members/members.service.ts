import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberDocument, Member } from '../schemas/member.schema';
import { AddMemberDto } from '../dtos/add-member.dto';

@Injectable()
export class MembersService {

  constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {
  }

  async addMember(addMemberDto: AddMemberDto) {



  }

}
