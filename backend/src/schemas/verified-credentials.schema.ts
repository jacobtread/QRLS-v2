import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class VerifiedCredentials {
  @Prop() givenName: string;
  @Prop() familyName: string;
  @Prop() dob: string;
}

export const VerifiedCredentialsSchema = SchemaFactory.createForClass(VerifiedCredentials);
