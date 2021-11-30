import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from '../schemas/vists.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: Visit.name, schema: VisitSchema } ]) ],
  controllers: [ VisitsController ],
  providers: [ VisitsService ],
  exports: [ VisitsService ],
})
export class VisitsModule {
}
