import { Injectable } from '@nestjs/common';
import { StartVerifyDto } from '../dtos/start-verify.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MemberDocument, Member } from '../schemas/member.schema';
import { Model } from 'mongoose';
import { VerificationResult, verifyPassURI } from '@vaxxnz/nzcp';

@Injectable()
export class VerifyService {

  constructor(@InjectModel(Member.name) private visitModel: Model<MemberDocument>) {
  }

  async startVerify(startVerifyDto: StartVerifyDto) {
    console.log(startVerifyDto)
    const result: VerificationResult = await verifyPassURI(startVerifyDto.data);
    if (result.success) {
      // TODO STORE DATA
      console.log(result.credentialSubject);
      return {};
    } else {
      return {
        error: result.violates.message,
      };
    }
  }


}
