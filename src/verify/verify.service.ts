import { HttpException, Injectable } from '@nestjs/common';
import { StartVerifyDto } from '../dtos/start-verify.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from '../schemas/member.schema';
import { Model } from 'mongoose';
import { CredentialSubject, VerificationResult, verifyPassURI } from '@vaxxnz/nzcp';
import moment from 'moment';
import { VisitsService } from '../visits/visits.service';

@Injectable()
export class VerifyService {

  constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>, private visitsService: VisitsService) {
  }

  toUpper(text: string) {
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      words[i] = word[0].toUpperCase() + word.substring(1).toLowerCase();
    }
    return words.join(' ');
  }

  transformName(subject: CredentialSubject): string {
    return this.toUpper(subject.givenName + ' ' + subject.familyName);
  }

  async startVerify(startVerifyDto: StartVerifyDto) {
    const result: VerificationResult = await verifyPassURI(startVerifyDto.data);

    // Error if the pass was not valid (provided incorrect qr?)
    if (!result.success) throw new HttpException(result.violates.message, 400);

    const credentials = result.credentialSubject;
    const name = this.transformName(credentials);

    // Check for existing members
    if (this.memberModel.findOne({ name })) {
      throw new HttpException(
        'You have already verified your account please use the verified button instead. You do NOT need to repeat this process again',
        422,
      );
    }

    const date = moment(credentials.dob, 'YYYY-MM-DD').toDate();

    // Create New Verified Member
    const newMember = new this.memberModel({ name, credentials, verifiedState: true, dob: date });
    const member = await newMember.save();

    // Creating Visit Entry
    await this.visitsService.create({ member: member._id });

    return {};
  }


}
