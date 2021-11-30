import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from '../schemas/member.schema';
import { VisitsModule } from '../visits/visits.module';

@Module({
  imports: [ MongooseModule.forFeature([ { name: Member.name, schema: MemberSchema } ]), VisitsModule ],
  controllers: [ VerifyController ],
  providers: [ VerifyService ],
})
export class VerifyModule {
}
