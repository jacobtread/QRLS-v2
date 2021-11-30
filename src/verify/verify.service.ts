import { HttpException, Injectable } from '@nestjs/common';
import { StartVerifyDto } from '../dtos/start-verify.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from '../schemas/member.schema';
import { Model } from 'mongoose';
import { CredentialSubject, VerificationResult, verifyPassURI } from '@vaxxnz/nzcp';
import { VisitsService } from '../visits/visits.service';
import { DateTime } from 'luxon';

@Injectable()
export class VerifyService {

  constructor(private readonly visitsService: VisitsService, @InjectModel(Member.name) private memberModel: Model<MemberDocument>) {
  }

  /**
   * Transforms the case of the provided text to uppercase
   * at the start of each word and the rest lowercase
   * (e.g SOME TEXT => Some Text)
   *
   * @param {string} text The text to transform
   * @returns {string} The transformed result
   */
  toUpper(text: string) {
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      words[i] = word[0].toUpperCase() + word.substring(1).toLowerCase();
    }
    return words.join(' ');
  }

  /**
   * Transforms the name provided from {@link CredentialSubject} from
   * all uppercase into lowercase with capitals for the start of each
   * word (e.g YOUR NAME => Your Name)
   *
   * @param {CredentialSubject} subject The subject to transform the name of
   * @returns {string} The transformed name
   */
  transformName(subject: CredentialSubject): string {
    return this.toUpper(subject.givenName + ' ' + subject.familyName);
  }

  /**
   * Verifies the provided Vaccine Pass data URI provided through
   * {@link StartVerifyDto} using {@link verifyPassURI} and then adds
   * the details to the verified member list
   *
   * @throws {HttpException} Thrown if the Vaccine Pass credentials were incorrect or already verified
   * @return {any} An empty JSON object on success
   */
  async verify(startVerifyDto: StartVerifyDto) {
    const result: VerificationResult = await verifyPassURI(startVerifyDto.data);

    // Error if the pass was not valid (provided incorrect qr?)
    if (!result.success) throw new HttpException(result.violates.message, 400);

    const credentials = result.credentialSubject;
    const name = this.transformName(credentials);

    // Check for existing members
    if (await this.memberModel.findOne({ name })) {
      throw new HttpException(
        'You have already verified your account please use the verified button instead. You do NOT need to repeat this process again',
        422,
      );
    }

    const dob = DateTime.fromISO(credentials.dob);

    // Create New Verified Member
    const newMember = new this.memberModel({ name, credentials, verifiedState: true, dob: dob.toJSDate() });
    const member = await newMember.save();

    // Creating Visit Entry
    await this.visitsService.create({ member: member._id });

    // JSON response contains name & DOB on success
    return {
      name,
      dob: dob.toISODate(),
    };
  }


}
