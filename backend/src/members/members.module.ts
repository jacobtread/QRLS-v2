import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from '../schemas/member.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: Member.name, schema: MemberSchema } ]) ],
  controllers: [ MembersController ],
  providers: [ MembersService ],
})
export class MembersModule {
}
