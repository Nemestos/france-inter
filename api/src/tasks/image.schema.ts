import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  hash: string;

  @Prop()
  path: string;

  @Prop()
  detect: number;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
