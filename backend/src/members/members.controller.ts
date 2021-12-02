import { Body, Controller, Post } from '@nestjs/common';
import { AddMemberDto } from '../dtos/add-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {

  constructor(private membersService: MembersService) {
  }

  @Post()
  async addMember(@Body() addMemberDto: AddMemberDto) {
    return await this.membersService.addMember(addMemberDto);
  }

}
