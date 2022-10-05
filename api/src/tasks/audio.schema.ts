import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop()
  trad_fr: string;

  @Prop()
  trad_en: string;

  @Prop()
  file_fr: string;

  @Prop()
  file_en: string;
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
