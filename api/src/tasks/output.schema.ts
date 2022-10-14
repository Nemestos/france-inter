import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Audio } from './audio.schema';
import { Image } from './image.schema';
export type OutputDocument = Output & Document;

@Schema()
export class Output {
  @Prop()
  image_name: string;

  @Prop()
  max_pers: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  id_image: Image;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' })
  id_trads: Audio;
}

export const OutputSchema = SchemaFactory.createForClass(Output);
