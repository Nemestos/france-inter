import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  text: string;

  @Prop()
  maxPersons: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
