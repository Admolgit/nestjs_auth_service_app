import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({})
export class User {
  create(body: any) {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  username: string;

  // @Prop({ unique: [true, 'Email already exists'] })
  // @Prop({ required: [true, 'Email must not be empty'] })
  // email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
