import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberDocument, VerifiedMember } from '../schemas/member.schema';

@Injectable()
export class MembersService {

  constructor(@InjectModel(VerifiedMember.name) private visitModel: Model<MemberDocument>) {
  }


}
